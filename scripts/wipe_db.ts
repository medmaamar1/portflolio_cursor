import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function clearDb() {
  console.log("Clearing all unauthorized knowledge from portfolio_documents...");
  const { error } = await supabase
    .from("portfolio_documents")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    console.error("Failed to delete data:", error.message);
  } else {
    console.log("Database wiped clean.");
  }
}

clearDb();
