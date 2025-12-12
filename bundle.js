const fallback = {
  columns: [{ key: "status", label: "Status" }],
  rows: [{ status: "UI loaded correctly" }]
};

let originalData = fallback;
let filteredRows = fallback.rows;
let activeFilters = {};

/* Columns that support inline filtering */
const FILTERABLE_COLUMNS = {
  risk_type: true,
  responsible_department: true
};

function getUniqueValues(rows, key) {
  return [...new Set(rows.map(r => r[key]).filter(Boolean))];
}

function applyFilters() {
}

function renderTable() {
}

/* ---------- INITIAL FALLBACK ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTable(fallback);
});

/* ---------- RECEIVE AGENT PAYLOAD ---------- */
window.addEventListener("message", (event) => {
  const data = event.data;
  if (
    data?.type === "ui_component_render" &&
    data?.source === "agentos" &&
    data?.payload?.columns &&
    data?.payload?.rows
  ) {
    originalData = data.payload;
    filteredRows = data.payload.rows;
    activeFilters = {};
    renderTable();
  }
});
