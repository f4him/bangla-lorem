import * as assert from "assert";
import * as vscode from "vscode";

suite("Bangla Lorem Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Extension activates", async () => {
    const extension = vscode.extensions.getExtension(
      "yourpublisher.bangla-lorem"
    );
    assert.ok(extension, "Extension not found");
    await extension.activate();
    assert.strictEqual(extension.isActive, true);
  });

  test("Completion for bnlem10 generates 10 characters", async () => {
    const doc = await vscode.workspace.openTextDocument({ content: "bnlem10" });
    const editor = await vscode.window.showTextDocument(doc);

    const position = new vscode.Position(0, 7); // after "bnlem10"
    const completionList = (await vscode.commands.executeCommand(
      "vscode.executeCompletionItemProvider",
      doc.uri,
      position
    )) as vscode.CompletionList;

    assert.ok(completionList.items.length > 0, "No completions found");

    // Take the first completion
    const completion = completionList.items[0];

    // Normalize range: could be Range or { inserting: Range; replacing: Range }
    let range: vscode.Range | undefined = undefined;
    if (completion.range) {
      if (completion.range instanceof vscode.Range) {
        range = completion.range;
      } else if ("inserting" in completion.range) {
        range = completion.range.inserting;
      }
    }

    await editor.insertSnippet(
      completion.insertText as vscode.SnippetString,
      range
    );

    const text = doc.getText();
    assert.strictEqual(
      text.length,
      10,
      `Expected 10 characters but got ${text.length}: "${text}"`
    );
  });
});
