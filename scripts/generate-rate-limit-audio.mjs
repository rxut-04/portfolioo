import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || "sk_139d00d356a1f71c5d55205ae59be330ffe13bcaff545921";
const VOICE_ID = process.env.VITE_ELEVENLABS_VOICE_ID || "rU18Fk3uSDhmg5Xh41o4";

const TONES = [
  {
    id: 'polite',
    text: "Oh, I'm so sorry! We've just hit our 1,000 credit demo limit for today, but I had so much fun chatting with you! Definitely check out Om's projects right below and reach out to him directly!",
    stability: 0.32,
    style: 0.60,
  },
  {
    id: 'playful',
    text: "Oops, my bad! Looks like our 1,000 credit demo quota just maxed out! I'd love to keep talking, but my voice quota is capped for now. Definitely explore Om's portfolio and say hi to him directly!",
    stability: 0.30,
    style: 0.65,
  },
  {
    id: 'professional',
    text: "Ah, so sorry about that! Our interactive demo credits just ran out for this session, but you were wonderful to talk to! Feel free to browse through Om's case studies and drop him a message anytime!",
    stability: 0.34,
    style: 0.58,
  },
  {
    id: 'casual',
    text: "Aww, so sorry to cut our chat short, but that wraps up our 1,000 credit voice demo! Feel free to check out everything Om built on the page and connect with him directly!",
    stability: 0.32,
    style: 0.60,
  },
  {
    id: 'architect',
    text: "Ah, looks like we just touched our 1,000 credit session ceiling! I'm so sorry, but you can explore all of Om's full-stack blueprints right here, or ping him directly to team up!",
    stability: 0.33,
    style: 0.58,
  },
  {
    id: 'enthusiastic',
    text: "Oh no, our 1,000 credit demo limit has officially been reached! Thank you so much for chatting with me today! Please take a look around Om's portfolio, he would love to connect with you!",
    stability: 0.30,
    style: 0.68,
  },
];

async function generateAudio(tone) {
  const filePath = path.join(process.cwd(), 'public', 'audio', `rate-limit-${tone.id}.mp3`);
  console.log(`Generating energetic apologetic audio for ${tone.id}...`);

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': API_KEY,
    },
    body: JSON.stringify({
      text: tone.text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: {
        stability: tone.stability,
        similarity_boost: 0.85,
        style: tone.style,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to generate ${tone.id}: ${response.status} ${errText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(arrayBuffer));
  console.log(`Saved ${filePath} (${arrayBuffer.byteLength} bytes)`);
}

async function main() {
  for (const tone of TONES) {
    await generateAudio(tone);
  }
  console.log("All 6 energetic apologetic audio files generated successfully!");
}

main().catch((err) => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
