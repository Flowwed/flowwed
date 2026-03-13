import OpenAI from "openai";
import { Buffer } from "buffer";

export const handler = async (event) => {
  try {
    const { text } = JSON.parse(event.body || "{}");

    if (!text) {
      return { statusCode: 400, body: "No text provided" };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const speech = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text
    });

    const audioBuffer = Buffer.from(await speech.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store"
      },
      body: audioBuffer.toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    console.error("TTS ERROR:", err);
    return { statusCode: 500, body: "TTS failed" };
  }
};
