# Axion Board Mobile / Lunier RevD Notes

## RevDで変更したこと

- RevCをコピーして `axion-board-mobile-lunier-revD` を作成
- 保存キーをRevD用に変更
- JSONエクスポートを追加
- JSONインポートを追加
- Rev2 `monthly_plan_YYYY_MM.json` の変換処理を追加
- `last-good` からの復元導線を追加
- 設定画面をRevD向けに更新
- READMEをRevD向けに更新

## 更新したファイル一覧

- `index.html`
- `README.md`
- `css/layout-mobile.css`
- `data/seed/axion_board_seed_2026_05.json`
- `js/main.js`
- `js/data-model.js`
- `js/storage.js`
- `js/views/settings-view.js`
- `docs/revD_notes.md`
- `docs/revD_test_home.png`
- `docs/revD_test_settings.png`

## 追加・削除したファイル

追加:

- `docs/revD_notes.md`

削除:

- `docs/revC_notes.md`

## localStorage保存キー

- 本体: `axion-board-mobile-lunier:revD`
- メタ情報: `axion-board-mobile-lunier:revD:meta`
- 直前退避: `axion-board-mobile-lunier:revD:last-good`

## JSONエクスポート

設定画面の「JSONを書き出す」から、現在のRevDデータをJSONとして保存する。

ファイル名例:

- `axion-board-lunier-revD-2026-05-202605231930.json`

エクスポートJSONには `schema_version: axion-board-mobile-lunier.revD` と `exported_at` を入れる。

## JSONインポート

設定画面の「JSONを読み込む」から、ブラウザのFile APIでローカルJSONを読み込む。

対応形式:

- RevD形式
- RevC形式
- Rev2 monthly_plan形式

読み込み前に現在の保存データを `last-good` へ退避する。

## Rev2 JSON変換方針

参照元:

- `C:\Users\Admin\Desktop\Python関係\Axion Board\axion-board-rev2\data\monthly_plan_2026_05.json`
- `C:\Users\Admin\Desktop\Python関係\Axion Board\axion-board-rev2\data\monthly_plan_2026_06.json`

変換内容:

- `month`, `month_label`, `theme`, `priorities`, `not_to_do`, `success_conditions`, `weeks`, `weekly_focus`, `shelves` をRevDへ引き継ぐ
- `week_memo`, `progress_note`, `memo` は棚メモへまとめる
- `parking_lot` はRevDの保留棚として扱う
- Rev2にSave Pointがないため、保留棚または先頭の棚からSave Point初期値を生成する
- `icon_asset_id` は棚IDまたは棚名から自動割り当てする

## last-good復元

保存、初期化、インポートの前に、現在の本体データを `last-good` に退避する。

設定画面の「last-goodから復元」で、退避データを現在データとして戻す。

## まだ未実装の項目

- PWA対応
- manifest.json
- service worker
- オフラインキャッシュ
- IndexedDB保存
- Rev2との自動同期
- 棚の新規追加、削除
- 月追加

## RevEでやるべき最小項目

- PWA対応
- manifest.json
- service worker
- 起動アイコン
- GitHub Pages公開前のseed最小化

## 動作確認

- `index.html` 表示: OK
- 下部ナビ: OK
- 設定画面のJSONエクスポート/インポート/last-good復元/初期化ボタン表示: OK
- ホーム編集とlocalStorage保存: OK
- Rev2 `monthly_plan_2026_05.json` インポート: OK
- インポート時の `last-good` 退避: OK
- JSONエクスポート処理: OK
- `last-good` からの復元: OK
- 再読み込み後の保存保持: OK
- 重大なRuntime/Logエラー: 0件

確認スクリーンショット:

- `docs/revD_test_home.png`
- `docs/revD_test_settings.png`

## 注意点

- GitHub Pagesへアップするのはアプリ本体だけにする
- 個人データ入りJSONをリポジトリへ置かない
- Rev2 JSONはスマホ側で読み込ませる
- 読み込んだデータはブラウザ内localStorageに残る
- 端末やブラウザを変えるとデータは共有されない

## 既存Rev2/RevB/RevCへの影響

- Rev2フォルダは読み取りのみ
- RevBフォルダは変更していない
- RevCフォルダはコピー元として使用し、直接変更していない
- RevDの編集対象は `C:\Users\Admin\Desktop\Python関係\Axion Board\axion-board-mobile-lunier-revD` のみ

## 軽量版キャラアイコン追加

- 参照元: `C:\Users\Admin\Desktop\Python関係\Axion Board\icon`
- 追加先: `assets/icons/characters/`
- 形式: 320x320 WebP、透過維持、quality 82
- 追加数: 33件
- 元PNG合計: 81,839,999 bytes
- 軽量WebP合計: 1,021,360 bytes

主な追加ファイル:

- `assets/icons/characters/axion_icon_01.webp`
- `assets/icons/characters/amaryllis_icon_01.webp`
- `assets/icons/characters/ordina_icon_01.webp`
- `assets/icons/characters/logos_icon_01.webp`
- ほか主要キャラ29件

## 棚編集でのアイコン選択

- `js/icon-assets.js` にアイコン一覧と `ICON_MAP` を追加
- `js/data-model.js` で軽量WebP版のアイコン定義を使用
- `js/main.js` の棚編集シートに「棚アイコン」を追加
- `js/components/edit-sheet.js` にアイコン選択用のラジオグリッドを追加
- `css/layout-mobile.css` にスマホ向けアイコンピッカー表示を追加
- 保存値は各棚の `icon_asset_id`
- localStorageとJSONには画像本体ではなくIDだけを保存する

動作確認:

- 棚詳細から編集シートを開ける: OK
- アイコン選択肢33件が表示される: OK
- `mona_icon_01` を選択して保存できる: OK
- 再読み込み後も `icon_asset_id: "mona_icon_01"` が残る: OK
- 表示画像が `assets/icons/characters/mona_icon_01.webp` に切り替わる: OK
- 追加確認スクリーンショット: `docs/revD_icon_picker_test.png`
- アイコン選択シート確認スクリーンショット: `docs/revD_icon_picker_sheet.png`

## 注意点

- WebPアイコンはGitHub Pagesに公開される静的アセットです。公開したくないキャラはアップロード前に `assets/icons/characters/` と `js/icon-assets.js` から外してください。
- スマホ上で画像をアップロードしてアイコン化する機能は今回入れていません。
- Rev2、RevB、RevCは変更していません。
