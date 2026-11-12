import fs from 'fs';
import path from 'path';

const API_KEY = process.env.ELEVENLABS_API_KEY || "sk_139d00d356a1f71c5d55205ae59be330ffe13bcaff545921";
const VOICE_ID = process.env.VITE_ELEVENLABS_VOICE_ID || "rU18Fk3uSDhmg5Xh41o4";

const TONES = [
  {
    id: 'polite',
    text: "Sorry to say, but you have reached the 1,000 credit demo limit for this session. Feel free to explore Om's portfolio and reach out directly!",
    stability: 0.5,
  },
  {
    id: 'playful',
    text: "Whoops! Looks like we've hit our 1,000 credit demo ceiling for now. Time to explore Om's projects and connect with him directly!",
    stability: 0.35,
  },
  {
    id: 'professional',
    text: "Apologies, but the 1,000 credit quota for this interactive demo has been fulfilled. Please feel free to inspect Om's case studies or contact him directly.",
    stability: 0.65,
  },
  {
    id: 'casual',
    text: "And that's a wrap on our 1,000 credit voice demo! Feel free to look around the rest of Om's portfolio and say hi directly.",
    stability: 0.45,
  },
  {
    id: 'architect',
    text: "System update: 1,000 credit threshold reached for this session. Voice pipeline on standby. Check out Om's system blueprints and drop him a message!",
    stability: 0.7,
  },
  {
    id: 'enthusiastic',
    text: "You've reached the 1,000 credit limit! Thanks for chatting—be sure to explore Om's featured work and reach out directly to connect!",
    stability: 0.38,
  },
];

async function generateAudio(tone) {
  const filePath = path.join(process.cwd(), 'public', 'audio', `rate-limit-${tone.id}.mp3`);
  console.log(`Generating audio for ${tone.id}...`);

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
        style: 0.2,
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
  console.log("All 6 tone audio files generated successfully with the exact ElevenLabs voice!");
}

main().catch((err) => {
  console.error("Error generating audio:", err);
  process.exit(1);
});
