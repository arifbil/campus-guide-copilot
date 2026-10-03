const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const pdfPath = "./knowledge/akademik/PD_PERATURAN-AKADEMIK-2024.pdf";

const dataBuffer = fs.readFileSync(pdfPath);

async function main() {
  const parser = new PDFParse({ data: dataBuffer });
  const data = await parser.getText();

  console.log("Jumlah halaman:", data.total);
  console.log("Jumlah karakter:", data.text.length);
  console.log("\n--- HASIL PEMBACAAN PDF ---\n");
  console.log(data.text.slice(0, 3000));

  await parser.destroy();
}

main().catch((error) => {
  console.error("Gagal membaca PDF:", error);
  process.exit(1);
});