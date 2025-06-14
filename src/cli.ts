#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";

import { generateReactContext } from "./generator";
import { extractInterface } from "./parser";

const program = new Command();

program
  .name("mojosa")
  .description("Generate React Context from a TypeScript type")
  .version("1.0.4");

program
  .argument("<filePath>", "Path to TypeScript file (relative to current location)")
  .argument("<interfaceName>", "Name of the interface or type (e.g. User)")
  .action((filePath, interfaceName) => {
    if (!filePath || !interfaceName) {
      console.error('Usage: mojosa <filePath> <interfaceName>');
      process.exit(1);
    }

    const src = fs.readFileSync(filePath, 'utf8');
    const fields = extractInterface(src, interfaceName);
    const out = generateReactContext(interfaceName, fields);
    const outPath = path.resolve(process.cwd(), `${interfaceName}.tsx`);

    fs.writeFileSync(outPath, out, 'utf8');
    console.log(`✅ Context generated at ${outPath}`);
  });

program.parse();


