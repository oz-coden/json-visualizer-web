# JSON Path Visualizer

日本語の説明は[目次](#目次)から読めます。

## Table of Contents

1. [Summary](#summary)
2. [Background of Development](#background-of-development)
3. [Features](#features)
4. [Requirements, Dependencies](#requirements-dependencies)
5. [Installation](#installation)
6. [LICENSE](#license)
7. [CREDIT](#credit)

## Summary

A browser-based tool for inspecting JSON structures and the JavaScript paths used to access their values. Paste JSON, choose a file, or drop a file into the input area.

[Playground Is Here!](https://tools.oz-coden.com/json-visualizer/)

## Background of Development

The aim is to make nested objects and arrays easier to inspect when writing JavaScript that reads JSON data.

## Features

- Multiple input methods  
  Paste JSON, select a `.json` file, or drag and drop a file into the text area.
- Structure and value display  
  Display objects, arrays and primitive values in a nested layout.
- JavaScript access paths  
  Paths start at `data`. Simple identifier keys use dot notation; other keys use quoted bracket notation, such as `data.users[0]["display-name"]`.
- Text-only rendering  
  Keys and values are displayed as text rather than executed as HTML.
- Shared navigation and themes  
  Use the common tool header and light or dark theme.

## Requirements, Dependencies

- A current web browser with JavaScript enabled and support for the File API.

The user interface is in Japanese. Shared UI assets are included in this repository. Python 3 is only needed for the example local server command below; an equivalent static HTTP server can also be used.

## Installation

1. Clone or download this repository, keeping the directory structure intact.
2. Start a static HTTP server from the repository root. For example, with Python 3:

   ```sh
   python -m http.server 8000
   ```

3. Open `http://localhost:8000/` in your browser.

The application files are at the repository root. Running the application requires only static HTML, CSS and JavaScript; no Node.js runtime, API server or build step is required.

JSON parsing and file reading run entirely in the browser. The application does not upload the input JSON or save it for restoration after reloading.

### Usage

1. Paste JSON into **JSONを入力** and click **解析する**. Alternatively, choose a file with **JSONファイルを開く**, or drop it into the text area; files are analyzed automatically.
2. Read the structure, values and paths under **JavaScriptでのアクセスパス**. `data` represents the parsed root value; replace it with the variable name used in your program.
3. Click **リセット** to clear the input and output.

Files are limited to 5 MiB (5 × 1024 × 1024 bytes). The display is limited to 3,000 nodes, including the root, and a depth of 100. Omitted content is indicated in the output. Invalid JSON produces an error message. These display limits do not limit the size of text pasted into the input.

### Development and publication

Application-specific behavior and layout are in `script.js` and `style.css`. Shared styles, navigation and themes are bundled in `vendor/ui/` from [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web). The source commit and file hashes are recorded in `shared-ui.json`, so the application does not fetch the shared UI repository at runtime.

To update the bundled UI, clone the shared UI repository alongside this repository. From this application's root, run `node ../oz-coden.com-ui-web/scripts/sync-ui.mjs . COMMIT_SHA`, replacing `COMMIT_SHA` with the full 40-character commit SHA to use. Commit the updated `vendor/ui/` files and `shared-ui.json`. This maintenance command requires Node.js 22 or later and an internet connection.

This repository checks JavaScript syntax on push and pull requests. With Node.js 22 or later, run the same checks locally:

```sh
node --check script.js
node --check vendor/ui/ui.js
```

The hosted application is assembled and published through [tools.oz-coden.com](https://github.com/oz-coden/tools.oz-coden.com). Its publication workflow applies the shared UI to all tools and runs browser integration checks. See that repository for deployment instructions.

## LICENSE

This project is released under the [MIT License](LICENSE).

## CREDIT

Shared styles, navigation and themes: [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web).

The initial implementation was adapted from the [json-visualizer tool](https://github.com/oz-coden/oz-coden.github.io/tree/dfc7c0a29396e2114d73e99dd17d494f7ab1c5ee/tools/json-visualizer) in oz-coden.github.io. This repository contains the source needed to run and modify the application independently.

---

# JSON Path Visualizer

## 目次

1. [概要](#概要)
2. [開発背景](#開発背景)
3. [機能](#機能)
4. [前提・依存](#前提依存)
5. [導入方法](#導入方法)
6. [ライセンス](#ライセンス)
7. [クレジット](#クレジット)

## 概要

JSONの構造と、各値をJavaScriptから参照するためのアクセスパスを表示するブラウザ用ツールです。貼り付け、ファイル選択、ドラッグ＆ドロップで入力できます。

[Playgroundはこちら！](https://tools.oz-coden.com/json-visualizer/)

## 開発背景

JSONデータをJavaScriptで扱う際に、入れ子になったオブジェクトや配列の構造と、値を参照するためのパスを確認しやすくすることを目的としています。

## 機能

- 複数の入力方法  
  JSONの貼り付け、`.json`ファイルの選択、入力欄へのドラッグ＆ドロップに対応しています。
- 構造と値の表示  
  オブジェクト・配列・プリミティブ値を、入れ子のレイアウトで表示します。
- JavaScriptのアクセスパス  
  パスの起点は`data`です。単純な識別子のキーにはドット記法を、それ以外には引用符付きのブラケット記法を使い、`data.users[0]["display-name"]`のように表示します。
- 文字列としての表示  
  キーや値はHTMLとして実行せず、文字列として表示します。
- 共通ナビゲーションとテーマ  
  共通ヘッダーとライト・ダークテーマを利用できます。

## 前提・依存

- JavaScriptが有効で、File APIに対応した最新のWebブラウザ。

画面の言語は日本語です。共通UIのファイルはこのリポジトリに同梱しています。Python 3は下記のローカルサーバーのコマンドを使う場合に必要で、同等の静的HTTPサーバーでも実行できます。

## 導入方法

1. このリポジトリをクローンまたはダウンロードし、フォルダ構成を保ちます。
2. リポジトリのルートで静的HTTPサーバーを起動します。Python 3を利用する場合は、次のコマンドを実行します。

   ```sh
   python -m http.server 8000
   ```

3. ブラウザで`http://localhost:8000/`を開きます。

アプリ本体はリポジトリのルートにあります。実行には静的なHTML・CSS・JavaScriptだけを使い、Node.jsの実行環境・APIサーバー・ビルド工程は不要です。

JSONの解析とファイルの読み込みはブラウザ内で行います。入力したJSONをアップロードしたり、再読み込み後に復元するために保存したりする処理はありません。

### 使い方

1. **JSONを入力**にJSONを貼り付け、**解析する**を押します。**JSONファイルを開く**でファイルを選ぶか、入力欄にドロップすると、自動で解析します。
2. **JavaScriptでのアクセスパス**で構造・値・パスを確認します。`data`は解析したルートの値を表すため、実際のコードでは利用する変数名に置き換えてください。
3. **リセット**で入力と結果を消去します。

ファイルの上限は5 MiB（5 × 1024 × 1024バイト）です。表示はルートを含む3000ノード・深さ100までで、省略がある場合は結果に表示します。不正なJSONはエラーメッセージを表示します。この表示上限は、入力欄に貼り付けられるテキストのサイズを制限するものではありません。

### 開発と公開

アプリ固有の処理は`script.js`、レイアウトは`style.css`で管理します。共通のスタイル・ナビゲーション・テーマ切り替えは、[oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web)から`vendor/ui/`へ同梱しています。取得元のコミットとファイルハッシュは`shared-ui.json`に記録しており、実行時に共通UIリポジトリへアクセスする必要はありません。

同梱の共通UIを更新するには、このリポジトリと同じ親フォルダに共通UIリポジトリをクローンします。このアプリのルートで`node ../oz-coden.com-ui-web/scripts/sync-ui.mjs . COMMIT_SHA`を実行し、`COMMIT_SHA`を取り込む版の40桁のコミットSHAに置き換えてください。更新された`vendor/ui/`のファイルと`shared-ui.json`をコミットします。この保守用コマンドには、Node.js 22以降とインターネット接続が必要です。

このリポジトリでは、pushとプルリクエスト時にJavaScriptの構文を検査します。Node.js 22以降を利用すると、同じ検査をローカルでも実行できます。

```sh
node --check script.js
node --check vendor/ui/ui.js
```

公開用のアプリは、[tools.oz-coden.com](https://github.com/oz-coden/tools.oz-coden.com)で組み立てて配信します。公開処理では、全ツールに共通UIを適用し、ブラウザでの統合検査を行います。公開手順は同リポジトリを参照してください。

## ライセンス

This project is released under the [MIT License](LICENSE).

## クレジット

共通のスタイル・ナビゲーション・テーマ：[oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web)。

初期実装は、oz-coden.github.ioの[json-visualizerツール](https://github.com/oz-coden/oz-coden.github.io/tree/dfc7c0a29396e2114d73e99dd17d494f7ab1c5ee/tools/json-visualizer)を元にしています。このリポジトリには、単独でアプリを実行・変更するためのソースを含めています。
