const fallback = {
  columns: [{ key: "status", label: "Status" }],
  rows: [{ status: "UI loaded correctly" }]
};

function renderTable(props) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const table = document.createElement("table");

  // Header
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  props.columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col.label;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");
  props.rows.forEach(row => {
    const tr = document.createElement("tr");
    props.columns.forEach(col => {
      const td = document.createElement("td");
      td.textContent = row[col.key] ?? "";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  root.appendChild(table);
}

// Render fallback immediately so iframe is never empty
document.addEventListener("DOMContentLoaded", () => {
  renderTable(fallback);
});

// LISTEN FOR THE EXISTING PAYLOAD (NO PAYLOAD CHANGES)
window.addEventListener("message", (event) => {
  // Do NOT block on origin unless required by your platform
  const data = event.data;

  if (!data || typeof data !== "object") return;

  // Match EXACT payload contract
  if (
    data.type === "ui_component_render" &&
    data.source === "agentos" &&
    data.payload &&
    Array.isArray(data.payload.columns) &&
    Array.isArray(data.payload.rows)
  ) {
    console.log("UI payload received:", data.payload);
    renderTable(data.payload);
  }
});
