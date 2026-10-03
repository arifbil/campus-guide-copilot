const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const pdfPath = "./knowledge/akademik/PD_PERATURAN-AKADEMIK-2024.pdf";

async function main() {
  const dataBuffer = fs.readFileSync(pdfPath);

  const parser = new PDFParse({ data: dataBuffer });
  const data = await parser.getText();

  const text = data.text;

  const cleanedText = text
  .replace(/--\s*\d+\s+of\s+\d+\s*--/g, "")
  .replace(/[ \t]+\n/g, "\n")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

  // Pisahkan teks berdasarkan bagian "Pasal"


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

const chunkSizes = chunks.map((chunk) => chunk.content.length);

console.log("Chunk terkecil:", Math.min(...chunkSizes), "karakter");
console.log("Chunk terbesar:", Math.max(...chunkSizes), "karakter");
console.log(
  "Rata-rata:",
  Math.round(chunkSizes.reduce((a, b) => a + b, 0) / chunkSizes.length),
  "karakter"
);

chunks.slice(0, 5).forEach((chunk, index) => {
  console.log(`\n===== CHUNK ${index + 1} =====`);
  console.log("Pasal:", chunk.pasal);
  console.log("Source:", chunk.source);
  console.log("Content:");
  console.log(chunk.content.slice(0, 1000));
});

  await parser.destroy();
}

main().catch((error) => {
  console.error("Gagal melakukan chunking:", error);
  process.exit(1);
});