# cocoichi-menu-mcp

CoCo壱番屋（カレーハウスCoCo壱）公式メニューブックをModel Context Protocol (MCP) サーバーとして提供するローカルツール。

## セットアップ

```bash
npm install
```

## 起動

```bash
npm run start
```

`@modelcontextprotocol/sdk` を利用した MCP サーバーが標準入出力上で起動し、`menu` テキストリソースを公開します。起動後に `modelcontextprotocol` が提供する `mcp` CLI や各種対応クライアントから `list-resources` / `read-resource` を実行すると、公開中のメニューが取得できます。アクセスのたびに標準出力へログが表示されます。

## クライアント設定例

`~/.config/modelcontext/mcp_servers/cocoichi-menu.json` に以下のような設定ファイルを配置すると、`mcp` CLI から `cocoichi-menu` サーバーを呼び出せます。

```json
{
  "command": "npm",
  "args": [
    "run",
    "start",
    "--"
  ]
}
```

必要に応じて `working_directory` や `env` などのオプションを追加してください。
