import { ICON_ASSETS, ICON_MAP } from "./icon-assets.js";

export { ICON_ASSETS, ICON_MAP };

export const AVATAR_MAP = {
  axion: ICON_MAP.axion_icon_01,
  amaryllis: ICON_MAP.amaryllis_icon_01,
  ordina: ICON_MAP.ordina_icon_01,
  logos: ICON_MAP.logos_icon_01
};

const SHELF_ICON_DEFAULTS = {
  "axion-board": "axion_icon_01",
  "personal-note": "axion_icon_01",
  "electronic-library": "logos_icon_01",
  "sanshimai-rpg": "ordina_icon_01",
  "toies-letter": "amaryllis_icon_01",
  "technical-shelf": "logos_icon_01"
};

const SAVEPOINT_ICON_DEFAULTS = {
  "save-axion-board": "axion_icon_01",
  "save-sanshimai-rpg": "ordina_icon_01",
  "save-technical-shelf": "logos_icon_01"
};

export async function loadSeedData() {
  const response = await fetch("data/seed/axion_board_seed_2026_05.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return normalizeBoard(await response.json());
}

export function normalizeBoard(source) {
  const shelves = Array.isArray(source.shelves) ? source.shelves : [];
  const savepoints = Array.isArray(source.savepoints) ? source.savepoints : [];
  const month = source.month || "2026-05";

  return {
    ...source,
    schema_version: source.schema_version || "axion-board-mobile-lunier.revD",
    updated_at: source.updated_at || "",
    month,
    month_label: source.month_label || "2026年5月",
    theme: source.theme || "",
    status: source.status || "prototype",
    current_week: Number.parseInt(source.current_week, 10) || 1,
    today_shelf_ids: Array.isArray(source.today_shelf_ids) ? source.today_shelf_ids : [],
    guide: {
      home: source.guide?.home || "",
      save: source.guide?.save || ""
    },
    priorities: normalizeStringArray(source.priorities),
    not_to_do: normalizeStringArray(source.not_to_do),
    success_conditions: normalizeStringArray(source.success_conditions),
    weeks: Array.isArray(source.weeks) ? source.weeks : [],
    weekly_focus: normalizeWeeklyFocus(source.weekly_focus),
    shelves: shelves.map((shelf, index) => ({
      id: shelf.id || `shelf-${index + 1}`,
      name: shelf.name || "未設定の棚",
      category: shelf.category || "未分類",
      status: shelf.status || "種まき",
      priority: shelf.priority || "中",
      energy: shelf.energy || "中",
      start_week: Number.parseInt(shelf.start_week, 10) || 1,
      end_week: Number.parseInt(shelf.end_week, 10) || 1,
      monthly_goal: shelf.monthly_goal || "",
      next_action: shelf.next_action || "",
      memo: shelf.memo || "",
      links: Array.isArray(shelf.links) ? shelf.links : [],
      avatar: shelf.avatar || "axion",
      icon_asset_id: shelf.icon_asset_id || SHELF_ICON_DEFAULTS[shelf.id] || iconIdFromAvatar(shelf.avatar)
    })),
    parking_lot: Array.isArray(source.parking_lot) ? source.parking_lot : [],
    savepoints: savepoints.map((savepoint, index) => ({
      id: savepoint.id || `savepoint-${index + 1}`,
      shelf_id: savepoint.shelf_id || "",
      saved_at: savepoint.saved_at || "",
      current_location: savepoint.current_location || "",
      completed: savepoint.completed || "",
      resume_next: savepoint.resume_next || "",
      stop_reason: savepoint.stop_reason || "",
      resume_conditions: savepoint.resume_conditions || "",
      forgettable: savepoint.forgettable || "",
      notes: savepoint.notes || "",
      icon_asset_id: savepoint.icon_asset_id || SAVEPOINT_ICON_DEFAULTS[savepoint.id] || "amaryllis_icon_01"
    })),
    assets: normalizeAssets(source.assets),
    settings: {
      current_board_id: source.settings?.current_board_id || month,
      theme: source.settings?.theme || "lunier",
      guide_character_asset_id: source.settings?.guide_character_asset_id || "axion_icon_01",
      last_saved_at: source.settings?.last_saved_at || source.updated_at || ""
    },
    settings_preview: normalizeStringArray(source.settings_preview)
  };
}

function normalizeWeeklyFocus(value) {
  return {
    week: Number.parseInt(value?.week, 10) || 1,
    items: normalizeStringArray(value?.items)
  };
}

function normalizeAssets(value) {
  const existing = Array.isArray(value) ? value : [];
  const nonIconAssets = existing.filter((asset) => asset?.type && asset.type !== "icon");
  return [
    ...nonIconAssets,
    ...ICON_ASSETS.map((asset) => ({ ...asset, type: "icon" }))
  ];
}

export function normalizeStringArray(value) {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function iconIdFromAvatar(avatar) {
  if (avatar === "ordina") return "ordina_icon_01";
  if (avatar === "logos") return "logos_icon_01";
  if (avatar === "amaryllis") return "amaryllis_icon_01";
  return "axion_icon_01";
}

export function iconPath(iconAssetId, fallback = "axion_icon_01") {
  return ICON_MAP[iconAssetId] || ICON_MAP[fallback] || ICON_MAP.axion_icon_01;
}

export function iconForShelf(shelf) {
  return iconPath(shelf?.icon_asset_id || iconIdFromAvatar(shelf?.avatar));
}

export function iconForSavepoint(savepoint) {
  return iconPath(savepoint?.icon_asset_id || "amaryllis_icon_01");
}

export function iconForGuide(board) {
  return iconPath(board?.settings?.guide_character_asset_id || "axion_icon_01");
}

export function shelfById(board, shelfId) {
  return board.shelves.find((shelf) => shelf.id === shelfId) || board.shelves[0];
}

export function savepointById(board, savepointId) {
  return board.savepoints.find((savepoint) => savepoint.id === savepointId) || board.savepoints[0];
}

export function shelvesForWeek(board, weekId) {
  return board.shelves.filter((shelf) => weekId >= shelf.start_week && weekId <= shelf.end_week);
}

export function todayShelves(board) {
  const ids = Array.isArray(board.today_shelf_ids) ? board.today_shelf_ids : [];
  const shelves = ids.map((id) => shelfById(board, id)).filter(Boolean);
  return shelves.length ? shelves : board.shelves.slice(0, 2);
}

export function parkedShelves(board) {
  return board.parking_lot.map((item) => ({
    ...item,
    shelf: shelfById(board, item.shelf_id)
  })).filter((item) => item.shelf);
}

export function savepointsWithShelves(board) {
  return board.savepoints.map((savepoint) => ({
    ...savepoint,
    shelf: shelfById(board, savepoint.shelf_id)
  })).filter((savepoint) => savepoint.shelf);
}

export function currentWeeklyFocus(board) {
  return board.weekly_focus?.items || [];
}

export function priorityTone(priority) {
  if (priority === "高") return "high";
  if (priority === "低") return "low";
  return "medium";
}

export function energyTone(energy) {
  if (energy === "重い") return "heavy";
  if (energy === "軽い") return "light";
  return "normal";
}
