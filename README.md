# cocoichi-menu-mcp

CoCo壱番屋（カレーハウスCoCo壱）公式メニューブックをModel Context Protocol (MCP) サーバーとして提供するローカルツール。

## セットアップと起動

```bash
uv run python -m cocoichi_menu.server
```

`FastMCPServer` が標準入出力上で起動し、`menu` テキストリソースを公開します。起動後に `modelcontextprotocol` が提供する `mcp` CLI や各種対応クライアントから `list-resources` / `read-resource` を実行すると、公開中のメニューが取得できます。ログにはアクセスのたびに `Providing CocoICHI menu resource` が出力されます。

## クライアント設定例

`~/.config/modelcontext/mcp_servers/cocoichi-menu.json` に以下のような設定ファイルを配置すると、`mcp` CLI から `cocoichi-menu` サーバーを呼び出せます。

```json
{
  "command": "uv",
  "args": [
    "run",
    "python",
    "-m",
    "cocoichi_menu.server"
  ]
}
```

必要に応じて `working_directory` や `env` などのオプションを追加してください。
