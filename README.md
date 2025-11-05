# cocoichi-menu-mcp

CoCo 壱番屋（カレーハウス CoCo 壱番屋）のメニューブックを Model Context Protocol (MCP) サーバーとして提供するローカルツールです。

## 1. リポジトリのクローン

```
git clone https://github.com/your-account/cocoichi-menu-mcp.git
```

## 2. Deno のインストール

https://docs.deno.com/runtime/getting_started/installation/

## 3. MCP の設定

特別な引数を指定しなくても、同梱されている `deno/menu.txt` をメニューとして公開します。

```json
{
  "servers": {
    "cocoichi-menu-mcp": {
      "type": "stdio",
      "command": "C:\\Dev\\mcp\\cocoichi-menu-mcp\\src\\server.ts",
      "args": []
    }
  }
}
```
