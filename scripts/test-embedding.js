require("dotenv").config({ path: ".env.local" });

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const result = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: "Pasal 1 Peraturan Akademik Politeknik Negeri Tanah Laut",
  });

const values = result.embeddings[0].values;

console.log("Embedding berhasil");
console.log("Jumlah dimensi:", values.length);
console.log("5 nilai pertama:", values.slice(0, 5));
}

main().catch((error) => {
  console.error("Gagal membuat embedding:", error);
  process.exit(1);
});