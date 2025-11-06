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
