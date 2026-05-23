const NAV_ITEMS = [
  { id: "home", label: "ホーム" },
  { id: "monthly", label: "月間" },
  { id: "shelf", label: "棚" },
  { id: "save", label: "Save" },
  { id: "settings", label: "設定" }
];

export function renderBottomNav(activeView) {
  return NAV_ITEMS.map((item) => `
    <button class="nav-item ${item.id === activeView ? "is-active" : ""}" type="button" data-nav="${item.id}" aria-current="${item.id === activeView ? "page" : "false"}">
      <span class="nav-mark" aria-hidden="true"></span>
      <span>${item.label}</span>
    </button>
  `).join("");
}
