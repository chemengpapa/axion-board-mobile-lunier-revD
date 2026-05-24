# Axion Board Mobile / Lunier RevE Notes

## RevEで追加したファイル

- `manifest.json`
- `service-worker.js`
- `js/pwa.js`
- `assets/pwa/apple-touch-icon.png`
- `assets/pwa/axion-board-icon-192.png`
- `assets/pwa/axion-board-icon-512.png`
- `assets/pwa/axion-board-maskable-512.png`
- `docs/revE_notes.md`

## RevEで更新したファイル

- `index.html`
- `js/main.js`
- `js/views/settings-view.js`
- `README.md`

## PWA化の実装内容

- `index.html` に `manifest.json`、theme color、apple touch icon、PWA登録JSを追加
- `manifest.json` で standalone 表示、相対 `start_url`、相対 `scope` を指定
- `js/pwa.js` でservice worker対応ブラウザだけ登録
- `service-worker.js` でアプリシェルと主要アセットを事前キャッシュ
- `activate` 時に古い `axion-board-lunier-*` キャッシュを削除
- 設定画面にホーム画面追加、localStorage注意、オフライン利用、アプリ更新確認を追加

## manifest.jsonの設定内容

- name: `Axion Board`
- short_name: `Axion`
- description: `今月触る棚と、安心して置く棚を選ぶための個人用ボード。`
- start_url: `./`
- scope: `./`
- display: `standalone`
- orientation: `portrait`
- theme_color: `#130d25`
- background_color: `#130d25`
- icons:
  - `assets/pwa/axion-board-icon-192.png`
  - `assets/pwa/axion-board-icon-512.png`
  - `assets/pwa/axion-board-maskable-512.png`

## service workerのキャッシュ対象

キャッシュ名:

- `axion-board-lunier-revE-v1`

主なキャッシュ対象:

- `./`
- `./index.html`
- `./manifest.json`
- `css/base.css`
- `css/layout-mobile.css`
- `css/theme-lunier.css`
- `js/main.js`
- `js/pwa.js`
- `js/storage.js`
- `js/data-model.js`
- `js/icon-assets.js`
- `js/components/*`
- `js/views/*`
- `data/seed/axion_board_seed_2026_05.json`
- 主要背景画像
- アクシオン案内役画像
- 棚アイコン用の軽量WebP 33件
- PWAアイコン
- Save Point用UI画像

localStorage内のユーザーデータはservice workerではキャッシュしません。

## PWAアイコンの元画像と出力先

元画像:

- `assets/icons/characters/axion_icon_01.webp`

出力先:

- `assets/pwa/apple-touch-icon.png`
- `assets/pwa/axion-board-icon-192.png`
- `assets/pwa/axion-board-icon-512.png`
- `assets/pwa/axion-board-maskable-512.png`

深い紫紺背景、金のリング、アクシオンアイコンを正方形キャンバスに収めています。

## GitHub Pagesでの注意点

- リポジトリ直下に `index.html`, `manifest.json`, `service-worker.js` が並ぶ配置を推奨します。
- GitHub PagesのFolderは `/(root)` を選びます。
- PWA関連パスは `./` 中心なので、ユーザー名配下のサブディレクトリ公開でも壊れにくい構成です。
- PWA登録はHTTPSまたはlocalhostでのみ有効です。`file://` では動きません。
- 公開したくない画像素材は、GitHubへアップロードする前に `assets/` から外してください。

## 動作確認結果

- 通常ブラウザ表示: OK
- manifest.json読み込み: OK
- manifest name: `Axion Board`
- manifest start_url: `./`
- service worker登録: OK
- service worker scope: `http://localhost:8013/`
- cache name: `axion-board-lunier-revE-v1`
- 下部ナビ: OK
- 棚アイコン変更: OK、選択肢33件
- 編集保存: OK
- localStorage保持: OK
- JSONエクスポート: OK
- JSONインポート: OK
- オフライン最低限表示: OK
- オフライン時のlocalStorage保持: OK
- 重大な4xxパスエラー: 再確認で0件
- 追加確認スクリーンショット: `docs/revE_pwa_settings_test.png`

## まだ残っている課題

- IndexedDB保存
- Rev2との自動同期
- 完全なオフライン初回起動
- キャッシュ更新通知の高度化
- 棚の追加・削除

## RevF以降でやるなら

- キャッシュ更新通知をより分かりやすくする
- データ保護を強めるためIndexedDBを検討する
- GitHub Pages公開前のアセット公開リスク確認リストを整える
- PWAインストール後のホーム画面表示を実機で確認する

## 既存RevDへの影響

RevEはRevDフォルダをコピーして作成しました。RevD、RevC、RevB、Rev2は変更していません。
