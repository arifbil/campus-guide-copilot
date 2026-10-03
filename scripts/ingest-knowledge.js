const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const { Pool } = require("pg");

const pdfPath = "./knowledge/akademik/PD_PERATURAN-AKADEMIK-2024.pdf";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "campus_guide",
  password: "arif555provsql",
  port: 5432,
});

async function main() {
  const dataBuffer = fs.readFileSync(pdfPath);

  const parser = new PDFParse({ data: dataBuffer });
  const data = await parser.getText();

  const cleanedText = data.text
    .replace(/--\s*\d+\s+of\s+\d+\s*--/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const chunks = cleanedText
    .split(/(?=^\s*Pasal\s+\d+)/gm)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .map((content) => {
      const match = content.match(/^Pasal\s+(\d+)/i);

      return {
        pasal: match ? Number(match[1]) : null,
        source: "PD_PERATURAN-AKADEMIK-2024.pdf",
        content,
      };
    });

  console.log("Jumlah chunks:", chunks.length);

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM knowledge_chunks");

    for (const chunk of chunks) {
      await client.query(
        `
        INSERT INTO knowledge_chunks (pasal, source, content)
        VALUES ($1, $2, $3)
        `,
        [chunk.pasal, chunk.source, chunk.content]
      );
    }

    await client.query("COMMIT");

    console.log("Berhasil memasukkan", chunks.length, "chunks ke database.");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await parser.destroy();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Gagal melakukan ingestion:", error);
  process.exit(1);
});