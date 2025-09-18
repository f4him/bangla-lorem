import * as vscode from "vscode";

/**
 * A long Bangla lorem string.
 * You can expand this as much as you want.
 */
const banglaLoremBase = `
যার ভিত্তি পচে গেছে, তাকে একদম উপড়ে ফেলে নতুন করে ভিত্তি না গাঁথলে তার ওপর ইমারত যতবার খাড়া করা যাবে, ততবারই তা পড়ে যাবে। দেশের যারা শত্রু, দেশের যা-কিছু মিথ্যা, ভণ্ডামি, মেকি তা সব দূর করতে প্রয়োজন হবে আগুনের সম্মার্জনা! আমার এমন গুরু কেউ নেই, যার খাতিরে সে আগুন-সত্যকে অস্বীকার করে কারুর মিথ্যা বা ভণ্ডামিকে প্রশ্রয় দেবে। আমি সে-দাসত্ব হতে সম্পূর্ণ মুক্ত। আমি কোনো দিনই কারুর বাণীকে বেদবাক্য বলে মনে নেব না, যদি তার সত্যতা প্রাণে তার সাড়া না দেয়। না বুঝে বোঝার ভণ্ডামি করে পাঁচ জনের শ্রদ্ধা আর প্রশংসা পাবার লোভ আমি কোনো দিনই করব না।
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
