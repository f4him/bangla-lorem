# Bangla Lorem

Generate Bangla placeholder (lorem ipsum–style) text directly inside VS Code.

---

## Features

- Type `bnlem<number>` (e.g., `bnlem200`) and press **Tab** to insert Bangla lorem text of that many **characters**.
- Works in any file type (HTML, Markdown, plaintext, etc.).
- Automatically replaces your trigger with generated Bangla text.
- Lightweight and fast — no external dependencies.

---

## Usage

1. Open a file in VS Code.
2. Type the trigger `bnlem` followed by the number of characters you want.
   - Example:
     ```
     bnlem50
     ```
3. Press **Tab**.
4. The trigger expands into Bangla lorem text of the requested length.

---

## Examples

| Trigger    | Output (preview)                                                |
| ---------- | --------------------------------------------------------------- |
| `bnlem10`  | মানুষের জী…                                                     |
| `bnlem50`  | মানুষের জীবন কেবল একটি মুহূর্তের…                               |
| `bnlem200` | মানুষের জীবন কেবল একটি মুহূর্তের গল্প নয়, এটি এক দীর্ঘ যাত্রা… |

---

## Commands

This extension contributes the following command (mainly for testing):

- **Bangla Lorem: Hello World**  
  Confirms that the extension has been activated.

---

## Requirements

No additional requirements. Works out of the box with VS Code.

---

## Extension Settings

This extension does not add any custom settings yet.  
Future updates may include options for:

- Generating Bangla words instead of characters
- Customizing lorem source text

---

## Known Issues

- Currently supports only **character count** (not word count).
- Does not yet support multi-paragraph output.

Contributions and feature requests are welcome!

---

## Release Notes

### 0.0.1

- Initial release
- Added support for `bnlem<number>` expansion into Bangla lorem text

---

## Links

- 🌐 [GitHub Repository](https://github.com/f4him/bangla-lorem)
- ❤️ [Support me on Patreon](https://patreon.com/f4him)

---

## License

This extension is licensed under the [MIT License](LICENSE.txt).
