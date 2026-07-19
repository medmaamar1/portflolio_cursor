import fetch from "node-fetch";

async function run() {
  console.log("Testing RAG endpoint...");
  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "What is the Smart SOC Platform?" }],
      visitorFingerprint: "test-123"
    })
  });
  
  if (!res.ok) {
    console.error("HTTP Error", res.status);
    const err = await res.json();
    console.error(err);
  } else {
    const data = await res.json();
    console.log("SUCCESS!");
    console.log("Response:", data.content);
    console.log("Citations:", data.citations);
  }
}

run();
