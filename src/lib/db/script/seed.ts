import 'dotenv/config';
import {insertQuotes} from '@/repositories/quotes';
import {myQuotes} from '@/myQuotes';

async function runSeed() {
  try {
    console.log("🌱 Initial data is being transferred to the database...");

    await insertQuotes(myQuotes);

    console.log("✅ Seed data successfully loaded into MongoDB!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed loading error:", error);
    process.exit(1);
  }
}

runSeed();
