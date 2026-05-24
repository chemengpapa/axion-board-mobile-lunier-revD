# Axion Board Mobile / Lunier RevE

RevEは、RevDのスマホ表示、編集、localStorage保存、JSONインポート/エクスポート、棚アイコン変更を維持したまま、GitHub Pages上でPWAとして使えるようにした版です。

## RevDとの違い

- `manifest.json` を追加
- `service-worker.js` を追加
- `js/pwa.js` でservice workerを登録
- PWA用アイコンを `assets/pwa/` に追加
- 設定画面にホーム画面追加とオフライン利用の説明を追加
- service workerのキャッシュ名を `axion-board-lunier-revE-v1` としてバージョン管理

## 起動方法

ローカルで確認する場合は、RevEフォルダで静的サーバーを起動します。

```powershell
cd "C:\Users\Admin\Desktop\Python関係\Axion Board\axion-board-mobile-lunier-revE"
python -m http.server 8013
```

ブラウザで開きます。

```text
http://localhost:8013/
```

PWA登録は `file://` では動きません。必ず `http://localhost` またはGitHub PagesのHTTPS URLで確認してください。

## GitHub Pagesへの配置

リポジトリ直下に以下が並ぶようにアップロードします。

```text
assets/
css/
data/
docs/
js/
index.html
manifest.json
service-worker.js
README.md
```

GitHub Pagesの設定は、Branchを `main`、Folderを `/(root)` にします。サブディレクトリ配信でも壊れにくいよう、PWA関連のパスは `./` から始まる相対パスを使っています。

## スマホでホーム画面に追加

Android:

Chromeのメニューから「ホーム画面に追加」を選ぶと、アプリのように起動できます。

iPhone:

Safariの共有メニューから「ホーム画面に追加」を選ぶと、アプリのように起動できます。

## データ保存の注意

- 編集データはブラウザ内のlocalStorageに保存されます。
- 端末やブラウザを変えるとデータは共有されません。
- RevEではRevDからの移行でデータを失いにくいよう、保存キーはRevD系を維持しています。
- 定期的に設定画面からJSONを書き出してバックアップしてください。
- 読み込んだJSONはGitHubへ送信されません。スマホのブラウザ内で処理されます。

## オフライン利用

一度オンラインで開くと、service workerがアプリシェル、CSS、JS、seed JSON、主要画像、PWAアイコンをキャッシュします。次回以降はオフラインでも最低限の画面を開けます。

完全な初回起動にはネットワークが必要です。画像やアプリ更新が反映されない場合は、設定画面の「アプリ更新を確認」を押してから再読み込みしてください。

## 既知の制限

- IndexedDBは未使用です。
- Rev2との自動同期はありません。
- 棚の新規追加、削除、月追加は未実装です。
- オフライン中のJSONインポートは、端末側のファイル選択UIに依存します。
- service workerの更新反映には、再読み込みやブラウザ再起動が必要な場合があります。

RevEでは、Axion BoardをPWAとしてホーム画面に置ける段階まで進めています。JSONバックアップは引き続き大切です。
