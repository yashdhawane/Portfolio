This folder is no longer required for the intro to have sound.

components/audioEngine.ts (lib/audioEngine.ts) generates the trailer's score
live in the browser with the Web Audio API — a low hum, glitch stabs, a
soft pad, a plucked "credits" run, an impact hit, and a closing chord — all
synthesized from oscillators/noise, not audio files. Nothing here needs a
license because nothing is a recording.

lib/useSpeech.ts narrates each line with the browser's built-in
speechSynthesis (Web Speech API) — also no files, no API keys.

If you ever want to layer a real produced track underneath the procedural
score for extra polish, you're welcome to add one and wire it into
IntroExperience.tsx yourself — just make sure it's music you've licensed
for this use (Epidemic Sound / Artlist / YouTube Audio Library are good
sources), since a trending reel's audio track generally isn't licensed for
reuse on an external site.
