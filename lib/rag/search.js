import { GoogleGenAI } from "@google/genai";
import pool from "../db.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vector harus memiliki jumlah dimensi yang sama.");
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

export async function searchKnowledge(query, limit = 5) {
  const embeddingResult = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: query,
  });

  const queryEmbedding = embeddingResult.embeddings[0].values;

  const result = await pool.query(
    `
    SELECT id, pasal, source, content, embedding
    FROM knowledge_chunks
    WHERE embedding IS NOT NULL
    ORDER BY id
    `
  );

  const scoredChunks = result.rows.map((row) => {
    const embedding = Array.isArray(row.embedding)
      ? row.embedding
      : JSON.parse(row.embedding);

    return {
      id: row.id,
      pasal: row.pasal,
      source: row.source,
      content: row.content,
      similarity: cosineSimilarity(queryEmbedding, embedding),
    };
  });


  return scoredChunks
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}