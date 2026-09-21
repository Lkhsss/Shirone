/* This is a script to create a new post markdown file with front-matter */

import fs from "fs";
import path from "path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

function getDatetime() {
  const date = new Date();
  const pad = (n) => String(n).padStart(2, "0");

  // 获取 UTC 时间，再手动加上目标时区偏移
  const offsetMinutes = 8 * 60; // +08:00
  const local = new Date(date.getTime() + offsetMinutes * 60 * 1000);

  const year = local.getUTCFullYear();
  const month = pad(local.getUTCMonth() + 1);
  const day = pad(local.getUTCDate());
  const hour = pad(local.getUTCHours());
  const minute = pad(local.getUTCMinutes());
  const second = pad(local.getUTCSeconds());

  return `${year}-${month}-${day}T${hour}:${minute}:${second}+08:00`;
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`);
	process.exit(1); // Terminate the script and return error code 1
}

let fileName = args[0];

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i;
if (!fileExtensionRegex.test(fileName)) {
	fileName += ".md";
}

const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, fileName);

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists `);
	process.exit(1);
}

// recursive mode creates multi-level directories
const dirPath = path.dirname(fullPath);
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

const content = `---
title: ${args[0]}
published: ${getDate()}
publishedAt: ${getDatetime()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`;

fs.writeFileSync(path.join(targetDir, fileName), content);

console.log(`Post ${fullPath} created`);
