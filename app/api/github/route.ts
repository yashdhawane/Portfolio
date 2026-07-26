import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    return NextResponse.json(
      { error: "Missing GITHUB_TOKEN or GITHUB_USERNAME environment variables" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($username: String!) {
            user(login: $username) {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
                contributionYears
              }
              repositories(first: 100, privacy: PUBLIC, ownerAffiliations: OWNER, isFork: false) {
                totalCount
                nodes {
                  languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
                    edges {
                      size
                      node {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {
          username: GITHUB_USERNAME,
        },
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GitHub API errors:", data.errors);
      return NextResponse.json({ error: "GitHub API error" }, { status: 500 });
    }

    const user = data.data.user;
    const calendar = user.contributionsCollection.contributionCalendar;
    
    // Calculate longest streak
    let currentStreak = 0;
    let longestStreak = 0;
    const allDays = calendar.weeks.flatMap((week: any) => week.contributionDays);
    
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    // Calculate top language
    const languageCounts: Record<string, number> = {};
    user.repositories.nodes.forEach((repo: any) => {
      repo.languages.edges.forEach((edge: any) => {
        const lang = edge.node.name;
        languageCounts[lang] = (languageCounts[lang] || 0) + edge.size;
      });
    });
    
    const topLanguage = Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)[0]?.[0] || "TypeScript";

    // Transform contribution data for the heatmap
    const contributions = calendar.weeks.map((week: any) =>
      week.contributionDays.map((day: any) => {
        // Map contribution count to levels 0-4
        const count = day.contributionCount;
        if (count === 0) return 0;
        if (count <= 2) return 1;
        if (count <= 4) return 2;
        if (count <= 8) return 3;
        return 4;
      })
    );

    return NextResponse.json({
      stats: {
        publicRepos: user.repositories.totalCount.toString(),
        totalContributions: calendar.totalContributions.toLocaleString(),
        longestStreak: `${longestStreak} days`,
        topLanguage,
      },
      contributions,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
