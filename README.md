# Axion Board Mobile / Lunier RevD

RevDは、RevCのスマホ編集とlocalStorage保存を引き継ぎ、JSONエクスポート/インポートと `last-good` からの復元導線を追加した版です。

既存Rev2、RevB、RevCとは別フォルダです。元フォルダは直接変更しません。

## RevDの目的

- スマホ上で編集した内容をlocalStorageに保存する
- 保存データをJSONとして書き出す
- RevD/RevC形式のJSONを読み込む
- Rev2の `monthly_plan_YYYY_MM.json` を読み込み、RevD形式へ変換する
- 読み込みや保存の前の状態を `last-good` に退避し、必要なら復元する

## GitHub Pagesでの想定運用

1. RevDフォルダを、個人データを入れない状態でGitHub Pagesへアップロードする
2. スマホで公開ページを開く
3. Rev2で作成した最新JSONをスマホへ送る
4. 設定画面の「JSONを読み込む」からRev2 JSONをインポートする
5. スマホ上で編集し、localStorageへ保存する
6. 必要なタイミングで「JSONを書き出す」からバックアップを保存する

GitHub Pagesにアップするのはアプリ本体だけです。読み込んだJSONはスマホのブラウザ内に保存され、GitHubへ送信されません。

## 保存キー

- 本体: `axion-board-mobile-lunier:revD`
- メタ情報: `axion-board-mobile-lunier:revD:meta`
- 直前退避: `axion-board-mobile-lunier:revD:last-good`

## インポートできるJSON

- RevD形式のエクスポートJSON
- RevC形式の保存JSON
- Rev2の `monthly_plan_2026_05.json` / `monthly_plan_2026_06.json` のような月間JSON

Rev2 JSONにはSave Point構造がないため、RevDは保留棚や棚情報から初期Save Pointを生成します。

## 起動方法

```powershell
cd "C:\Users\Admin\Desktop\Python関係\Axion Board\axion-board-mobile-lunier-revD"
python -m http.server 8012
```

ブラウザで開きます。

```text
http://localhost:8012/
```

## スマホ確認方法

- PCブラウザのデバイスモードで幅390px前後にする
- 設定画面でJSONエクスポート/インポートを確認する
- Rev2 JSONを読み込み、月間テーマや棚が反映されることを確認する
- 何か編集して保存し、再読み込み後も残ることを確認する
- last-goodから復元できることを確認する

## 既知の制限

- PWA、manifest、service workerは未実装
- オフラインキャッシュは未実装
- IndexedDBは未使用
- Rev2との自動同期はしない
- JSONインポートはブラウザ上で選択したファイルのみ扱う
- 棚の新規追加、削除、月追加は未実装

RevDでは、スマホローカルで編集、保存、JSONバックアップ、読み戻しまでを扱います。PWA化はRevE以降で十分です。

## 軽量アイコンと棚編集

- `C:\Users\Admin\Desktop\Python関係\Axion Board\icon` の主要キャラアイコン33件を、RevD内の `assets/icons/characters/` に軽量WebPとして追加しました。
- 元PNG合計は約78MB、WebP合計は約1MBです。
- 棚詳細の編集シートで「棚アイコン」を選べます。
- 保存されるのは `icon_asset_id` だけなので、localStorageやJSONは重くなりません。
- 画像ファイル自体はGitHub Pagesに置く前提です。公開リスクが気になる素材は、アップロード前に `assets/icons/characters/` から外してください。
