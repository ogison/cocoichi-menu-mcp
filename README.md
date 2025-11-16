# cocoichi-menu-mcp

CoCo 壱番屋（カレーハウス CoCo 壱番屋）のメニューブックを Model Context Protocol (MCP) サーバーとして提供するローカルツールです。

提供するレスポンスには、メニュー項目に加えてメニューブックで案内されている辛さ調整とオプション（ライス量やルー増量など）の詳細も含まれます。`searchMenuItems` ツールは該当するカスタマイズオプションを `optionMatches` 配列で返します。

## 免責事項

- 本リポジトリおよびツールは非公式であり、株式会社壱番屋とは関係ありません。
- メニューデータは [公式メニューブック（PDF）](https://www.ichibanya.co.jp/menu/pdf/menubook_regular.pdf) を参考にしています。

## 1. リポジトリのクローン

```
git clone https://github.com/your-account/cocoichi-menu-mcp.git
```

## 2. Deno のインストール

https://docs.deno.com/runtime/getting_started/installation/

## 3. MCP の設定

特別な引数を指定しなくても、リポジトリ内の `data/*.ts` に定義されているメニューデータをそのまま公開できます。クライアントごとの設定例は以下のとおりです。

### Claude Desktop

`%AppData%/Claude/mcp_config.json`（Windows）のような設定ファイルに以下を追記します。`command` と `args` の値は自分の環境に合わせて変更してください。

```json
{
  "mcpServers": {
    "cocoichi-menu-mcp": {
      "command": "deno",
      "args": [
        "run",
        "--allow-read",
        "C:\\Dev\\mcp\\cocoichi-menu-mcp\\src\\server.ts"
      ]
    }
  }
}
```

### Cursor

`~/.cursor/mcp.json` に以下のような設定を追加します。パスの区切りや権限フラグは利用環境に合わせて変更してください。

```json
{
  "mcpServers": {
    "cocoichi-menu-mcp": {
      "command": "deno",
      "args": [
        "run",
        "--allow-read",
        "/path/to/cocoichi-menu-mcp/src/server.ts"
      ]
    }
  }
}
```

### VS Code（Claude Dev 拡張）

VS Code の設定（`settings.json`）に MCP サーバーを登録します。

```json
"claude.mcpServers": {
  "cocoichi-menu-mcp": {
    "command": "deno",
    "args": [
      "run",
      "--allow-read",
      "/path/to/cocoichi-menu-mcp/src/server.ts"
    ]
  }
}
```

いずれのクライアントでも、必要に応じて `--allow-net` など追加の Deno 権限フラグを付けてください。
