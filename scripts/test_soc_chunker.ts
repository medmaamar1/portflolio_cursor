import fs from 'fs';
import { chunkMarkdownFile, ContentFile } from '../lib/rag/chunker';

async function testChunker() {
  const filePath = './content/projects/soc_automated.md';
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const fileObj: ContentFile = {
    docType: 'projects',
    sourceFile: 'soc_automated.md',
    rawText: content
  };

  const chunks = chunkMarkdownFile(fileObj);
  
  console.log(`Found ${chunks.length} chunks for soc_automated.md:\n`);
  
  chunks.forEach((chunk, index) => {
    console.log(`--- Chunk ${index + 1} ---`);
    console.log(`Title: ${chunk.metadata.title}`);
    console.log(`Section: ${chunk.metadata.section}`);
    console.log(`Content:\n${chunk.content}\n`);
  });
}

testChunker().catch(console.error);
