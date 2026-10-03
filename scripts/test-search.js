require("dotenv").config({ path: ".env.local" });

const { searchKnowledge } = require("../lib/rag/search.js");

async function main() {
  const query =
    "Berapa minimal IPK untuk mendapatkan ijazah?";

  const results = await searchKnowledge(query, 5);

  console.log("\n===== HASIL SEARCH KNOWLEDGE =====\n");

  results.forEach((result, index) => {
    console.log(`--- HASIL ${index + 1} ---`);
    console.log("ID:", result.id);
    console.log("Pasal:", result.pasal);
    console.log("Similarity:", result.similarity);
    console.log("Content:");
    console.log(result.content.slice(0, 500));
    console.log();
  });
}

main().catch((error) => {
  console.error("Gagal melakukan search:", error);
  process.exit(1);
});