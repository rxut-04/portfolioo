import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

export const elevenlabs = new ElevenLabsClient({
  apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY || "",
});

export const DEFAULT_VOICE_ID = import.meta.env.VITE_ELEVENLABS_VOICE_ID || "rU18Fk3uSDhmg5Xh41o4";
export const AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID || "agent_9201m74x52zzfnm8me49h8mxvsdz";
