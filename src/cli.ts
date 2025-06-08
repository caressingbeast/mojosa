#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { extractInterface } from './parser';
import { generateReactContext } from './generator';

const [, , filePath, interfaceName] = process.argv;
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
