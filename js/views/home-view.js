import { currentWeeklyFocus, parkedShelves, todayShelves } from "../data-model.js";
import { renderAxionGuide } from "../components/axion-guide.js";
import { renderShelfCard } from "../components/shelf-card.js";
import { escapeHtml } from "../utils/html.js";

export function renderHomeView(board) {
  const focus = currentWeeklyFocus(board);
  const parked = parkedShelves(board);
  return `
    <section class="home-hero lunier-hero">
      <div class="hero-copy">
        <p class="eyebrow">Monthly Shelf Board</p>
        <h1>Axion Board</h1>
        <p class="month-label">${escapeHtml(board.month_label)}</p>
        <p class="theme-line">${escapeHtml(board.theme)}</p>
      </div>
      <button class="hero-edit-button" type="button" data-edit="home">編集</button>
    </section>

    ${renderAxionGuide(board, board.guide?.home || "今日見る棚だけ選びましょう。")}

    <section class="page-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Today</p>
          <h2>今日見るべき棚</h2>
        </div>
      </div>
      <div class="card-list">
        ${todayShelves(board).map((shelf) => renderShelfCard(shelf)).join("")}
      </div>
    </section>

    <section class="page-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Focus</p>
          <h2>今週のフォーカス</h2>
        </div>
      </div>
      <ol class="focus-list">
        ${focus.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ol>
    </section>

    <section class="page-section">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Rest</p>
          <h2>置いてよい棚</h2>
        </div>
      </div>
      <div class="rest-list">
        ${parked.map((item) => `
          <article class="rest-card" data-shelf-card="${escapeHtml(item.shelf.id)}">
            <span>${escapeHtml(item.shelf.name)}</span>
            <p>${escapeHtml(item.reason)}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="savepoint-link-band">
      <div>
        <p class="eyebrow">Save Point</p>
        <h2>止めるための記録を見る</h2>
      </div>
      <button type="button" data-nav="save">Saveへ</button>
    </section>
  `;
}
