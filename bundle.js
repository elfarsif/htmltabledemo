const fallback = {
  columns: [{ key: "status", label: "Status" }],
  rows: [{ status: "UI loaded correctly" }]
};

let originalData = fallback;

/*RENDER TABLE*/
function renderTable() {
  const root = document.getElementById("root");
  if (!root) return;

  root.innerHTML = "";

  const table = document.createElement("table");

  /* ---------- HEADER ---------- */
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  originalData.columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col.label;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  /* ---------- BODY ---------- */
  const tbody = document.createElement("tbody");

  originalData.rows.forEach(row => {
    const tr = document.createElement("tr");

    originalData.columns.forEach(col => {
      const td = document.createElement("td");
      td.textContent = row[col.key] ?? "";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  root.appendChild(table);
}

/* ---------- INITIAL FALLBACK ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
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
    renderTable();
  }
});
