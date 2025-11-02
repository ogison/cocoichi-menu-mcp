# cocoichi-menu-mcp

CoCo壱番屋（カレーハウスCoCo壱）公式メニューブックを Model Context Protocol (MCP) サーバーとして提供するローカルツール。

## 機能概要

- `data/menubook_regular.pdf` からメニューを抽出し、FastAPI ベースの MCP サーバーとして公開します。
- 抽出結果は JSON キャッシュ (`data/menubook_regular.json`) に保存され、再起動時の読み込みを高速化します。
- カレー種別・トッピング・価格帯などで検索可能なハンドラーを提供します。

## セットアップ

### 1. 依存パッケージのインストール

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
# 開発向けツール（pytest 等）を含める場合
pip install -e .[dev]
```

### 2. サーバーの起動

```bash
uvicorn cocoichi_menu_mcp.server:app --reload
```

`http://127.0.0.1:8000/docs` にアクセスすると、提供されるエンドポイントを確認できます。

### 3. MCP クライアントからの利用

MCP クライアントが HTTP ベースのエンドポイントを利用できる場合、上記サーバー URL を接続先として設定してください。

## メニュー PDF の更新手順

1. 最新のメニューブック PDF を `data/menubook_regular.pdf` に上書きします。
2. サーバーを再起動するか、`GET /menu` エンドポイントにアクセスすると自動的に再解析されます。
3. JSON キャッシュをリセットしたい場合は `data/menubook_regular.json` を削除してください（次回アクセス時に再生成されます）。

## テスト

以下のコマンドでユニットテスト／統合テストを実行できます。

```bash
pytest
```

## プロジェクト構成

```
.
├── data/
│   └── menubook_regular.pdf        # メニュー PDF（解析対象）
├── src/
│   └── cocoichi_menu_mcp/
│       ├── __init__.py             # パッケージエントリ
│       ├── menu_loader.py          # PDF 解析およびキャッシュ処理
│       ├── models.py               # Pydantic モデル
│       └── server.py               # FastAPI MCP サーバー
└── tests/
    ├── test_parser.py              # PDF 解析ユニットテスト
    └── test_server.py              # エンドポイント統合テスト
```
