import { LAST_GOOD_KEY, META_KEY, STORAGE_KEY } from "../storage.js";
import { escapeHtml } from "../utils/html.js";

function formatDateTime(value) {
  if (!value) return "まだ保存されていません";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export function renderSettingsView(board, storageInfo = {}) {
  const lastSavedAt = board.settings?.last_saved_at || storageInfo.last_saved_at || "";
  const nextItems = [
    "PWA対応",
    "manifest.json",
    "service worker",
    "オフラインキャッシュ",
    "IndexedDB移行",
    "Rev2との同期"
  ];

  return `
    <section class="page-title">
      <p class="eyebrow">Settings</p>
      <h1>設定</h1>
      <p>RevDでは、JSONバックアップと復元を扱います。</p>
    </section>

    <section class="page-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Backup</p>
          <h2>JSONバックアップ</h2>
        </div>
      </div>
      <div class="settings-list">
        <article class="settings-panel">
          <h3>JSONエクスポート</h3>
          <p>現在のRevD保存データを、スマホやPCにJSONファイルとして保存します。</p>
          <button class="primary-button" type="button" data-export-json>JSONを書き出す</button>
        </article>
        <article class="settings-panel">
          <h3>JSONインポート</h3>
          <p>RevD/RevC形式、またはRev2の monthly_plan JSON を読み込みます。読み込み前の状態は last-good に退避します。</p>
          <label class="file-import-button">
            <span>JSONを読み込む</span>
            <input type="file" accept="application/json,.json" data-import-json />
          </label>
        </article>
        <article class="settings-panel">
          <h3>last-goodから復元</h3>
          <p>直前退避データへ戻します。インポートや保存の前の状態に戻したいときだけ使います。</p>
          <button class="secondary-button" type="button" data-restore-last-good>last-goodから復元</button>
        </article>
      </div>
    </section>

    <section class="page-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Storage</p>
          <h2>保存状態</h2>
        </div>
      </div>
      <div class="settings-list">
        <article class="settings-item">
          <span>現在のデータ保存方式</span>
          <small>localStorage + JSONバックアップ</small>
        </article>
        <article class="settings-item">
          <span>保存キー</span>
          <small>${escapeHtml(STORAGE_KEY)}</small>
        </article>
        <article class="settings-item">
          <span>最終保存日時</span>
          <small>${escapeHtml(formatDateTime(lastSavedAt))}</small>
        </article>
        <article class="settings-item subtle-item">
          <span>補助キー</span>
          <small>${escapeHtml(META_KEY)} / ${escapeHtml(LAST_GOOD_KEY)}</small>
        </article>
      </div>
    </section>

    <section class="detail-field danger-zone">
      <h2>データ初期化</h2>
      <p>このブラウザ内のRevD保存データを、seedの初期状態に戻します。実行前に last-good へ退避します。</p>
      <button class="secondary-button danger-button" type="button" data-reset-data>初期データに戻す</button>
    </section>

    <section class="page-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Later</p>
          <h2>今後実装予定</h2>
        </div>
      </div>
      <div class="settings-list">
        ${nextItems.map((item) => `
          <article class="settings-item">
            <span>${escapeHtml(item)}</span>
            <small>RevE以降</small>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}
