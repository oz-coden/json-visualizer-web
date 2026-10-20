# JSON Path Visualizer

[ブラウザで使う](https://tools.oz-coden.com/json-visualizer/)

JSONの構造とJavaScriptのアクセスパスを表示します。貼り付け・ファイル選択・ドラッグ＆ドロップに対応します。キーや値はHTMLとして実行せず、文字列として表示します。

## 実行方法

1. このリポジトリをクローンまたはダウンロードし、フォルダ構成を保ちます。
2. リポジトリのルートで `python -m http.server 8000` を実行します（Python 3が必要です）。
3. ブラウザで `http://localhost:8000/` を開きます。

実行時は静的なHTML・CSS・JavaScriptだけを使います。Node.jsやAPIサーバー、ビルド工程は不要です。入力内容の処理はブラウザ内で行います。

## 仕様

ファイルは5MBまで、表示は先頭3000ノード・深さ100までです。識別子として使えないキーはブラケット記法で表示します。

## 共通UI

`vendor/ui/` は [oz-coden.com-ui-web](https://github.com/oz-coden/oz-coden.com-ui-web) の配布用コピーです。利用するコミットとファイルハッシュは `shared-ui.json` に記録しています。個別のレイアウトは `style.css` で管理します。

共通UIを更新する場合は、共通UIリポジトリの `scripts/sync-ui.mjs` を使い、取り込んだファイルとメタデータをコミットしてください。配布用コピーを同梱しているため、実行時に共通UIリポジトリへアクセスする必要はありません。

## ソースの来歴

初期実装は [oz-coden.github.io](https://github.com/oz-coden/oz-coden.github.io) のコミット `dfc7c0a29396e2114d73e99dd17d494f7ab1c5ee` にあるツールを元にしています。このリポジトリで単独実行・変更できます。
