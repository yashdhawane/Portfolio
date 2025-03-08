// Create a lib/api.js file for your API functions
export async function fetchAPI(path:string) {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    const response = await fetch(`${baseUrl}/api${path}`, {cache: "force-cache",
        next: { revalidate: 60 }});
    const data = await response.json();
    return data;
  }
  
  // Get all blog posts
  export async function getAllPosts() {
    const data = await fetchAPI('/portfolio-projects?populate=*');
    return data.data;
  }
  
  // Get a single blog post by slug
  export async function getPostBySlug(slug:string) {
    const data = await fetchAPI(`/articles?filters[slug][$eq]=${slug}&populate=*`);
    return data.data[0];
  } 

  export function getStrapiMedia(url:string) {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('//')) return url;
    
    return `http://localhost:1337${url}`;
  }