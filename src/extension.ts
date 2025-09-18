import * as vscode from "vscode";

/**
 * A long Bangla lorem string.
 * You can expand this as much as you want.
 */
const banglaLoremBase = `
মানুষের জীবন কেবল একটি মুহূর্তের গল্প নয়, এটি এক দীর্ঘ যাত্রা। 
সমাজ তাকে নিয়মের বাঁধনে আবদ্ধ রাখে, প্রকৃতি সীমা দেয়, 
কিন্তু মানুষের অন্তরের সৃজনশীল শক্তি সকল বাধা ভেদ করে নিজের পথ খুঁজে নেয়।
`;

/**
 * Generate Bangla lorem text of given character length
 */
function generateBanglaLorem(length: number): string {
  if (length <= 0) {
    return "";
  }

  // Remove newlines/spaces for cleaner cycling
  const base = banglaLoremBase.replace(/\s+/g, " ").trim();
  let result = "";

  while (result.length < length) {
    result += base;
  }
  return result.slice(0, length);
}

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension "bangla-lorem" is active!');

  const provider = vscode.languages.registerCompletionItemProvider(
    { scheme: "file", language: "*" }, // works in all file types
    {
      provideCompletionItems(document, position) {
        const line = document.lineAt(position).text;
        const prefix = line.slice(0, position.character);

        // Match pattern: bnlem<number> (e.g., bnlem200)
        const match = prefix.match(/bnlem(\d+)$/);
        if (!match) {
          return undefined;
        }

        const length = parseInt(match[1], 10) || 50; // default 50 chars
        const loremText = generateBanglaLorem(length);

        const completion = new vscode.CompletionItem(
          `Insert Bangla lorem (${length} characters)`,
          vscode.CompletionItemKind.Snippet
        );
        completion.insertText = loremText;

        // Replace the trigger (bnlem###) with the generated lorem
        const range = new vscode.Range(
          position.translate(0, -match[0].length),
          position
        );
        completion.range = range;

        return [completion];
      },
    },
    "" // no specific trigger character, suggestion works with Tab/Ctrl+Space
  );

  context.subscriptions.push(provider);
}

export function deactivate() {}
