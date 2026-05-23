# Axion Board Mobile / Lunier Rev B Notes

## 実装方針

- 既存Rev2を直接変更せず、`axion-board-mobile-lunier-revB` に新規作成。
- Rev Bは表示専用。編集、保存、PWA、localStorage、JSONインポート/エクスポートは未実装。
- スマホ縦画面を最優先し、PC表示は横幅を広げすぎない中央寄せに留める。
- ガントチャートは使わず、週別カード、棚カード、Save Pointカードで構成。
- Axion Boardの目的を「今月触る棚を選び、触らない棚を安心して置くこと」に絞る。
- 画像素材は必要最小限だけ軽量化してコピー。

## 画面構成

- ホーム: 今月のテーマ、今日見るべき棚、今週のフォーカス、置いてよい棚、アクシオンの一言、Save Point導線。
- 月間: 優先事項、やらないこと、勝利条件、週別カード、棚カード一覧、保留棚。
- 棚: 選択中の棚のカテゴリ、状態、優先度、エネルギー、今月のゴール、次の一手、メモ、リンク。
- Save: プロジェクト別のセーブブロック、現在地、次に再開するなら、止める理由、再開条件、忘れてよいこと。
- 設定: Rev C以降の予定項目をダミー表示。

## 使用素材一覧

| 加工後ファイル | 元ファイル | 加工内容 |
|---|---|---|
| `assets/backgrounds/lunier_savepoint_bg.jpg` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\back ground\黒紫ルミナ反応地点_背景_01.png` | 1120x630のJPEGへ縮小、品質78 |
| `assets/characters/axion_smile.png` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\standing illustration\three sisters\three_sisters_transparency\Axion_smile_01t.png` | 最大360x540へ縮小 |
| `assets/characters/axion_calm.png` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\standing illustration\three sisters\three_sisters_transparency\Axion_calm_01t.png` | 最大320x500へ縮小 |
| `assets/characters/axion_smile_bust.png` | `assets/characters/axion_smile.png` | 案内役用に168x168へ切り出し |
| `assets/characters/axion_calm_bust.png` | `assets/characters/axion_calm.png` | 案内役用に168x168へ切り出し |
| `assets/avatars/axion_avatar.png` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\mini avator\三姉妹\Axion_mini_avator_sheet_01.png` | 先頭コマを144x144へ切り出し |
| `assets/avatars/ordina_avatar.png` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\mini avator\三姉妹\Ordina_mini_avator_sheet_01.png` | 先頭コマを144x144へ切り出し |
| `assets/avatars/logos_avatar.png` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\mini avator\三姉妹\Logos_mini_avator_sheet_01.png` | 先頭コマを144x144へ切り出し |
| `assets/ui/save_block_node.png` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\マップ移動画面用ノードUI素材シート_02.png` | Save Point用ノードを260x230へ切り出し |
| `assets/ui/save_aura_purple.png` | `C:\Users\Admin\Desktop\note\CAOL Project\小説\リユニエの星環\青PDP\90_素材_イラスト\40_rpg素材候補\エフェクト素材シート_02.png` | 紫系オーラを300x236へ切り出し |

## 未実装項目

- 編集機能
- 保存機能
- localStorage保存
- JSONエクスポート
- JSONインポート
- PWA対応
- service worker
- manifest.json
- 既存Rev2との同期
- Pythonサーバー保存API

## 次に進むなら

Rev Cでは、最初に以下だけを実装するのがよいです。

- 今月のテーマの編集
- 今週のフォーカスの編集
- 棚メモの編集
- Save Pointの6項目編集
- localStorage保存

JSONインポート/エクスポートとPWAは、localStorage保存が安定してからで十分です。

## 注意点

- Rev Bのseed JSONは表示確認用で、既存Rev2の月間JSONとは同期していません。
- 画像素材は軽量化済みですが、PWA化する場合はキャッシュ対象をさらに絞る必要があります。
- 個人情報や機密情報はseed JSONへ入れない運用を継続してください。
- Save PointはToDoではなく、安心して止めるための記録として扱います。
