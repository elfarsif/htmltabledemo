const fallback = {
  columns: [{ key: "status", label: "Status" }],
  rows: [{ status: "UI loaded correctly" }]
};

function applyFilters() {
  filteredRows = originalData.rows.filter(row =>
    Object.entries(activeFilters).every(
      ([key, value]) => !value || row[key] === value
    )
  );
  renderTable();
}

function renderTable() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const table = document.createElement("table");

  /* ---------- HEADER ---------- */
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  originalData.columns.forEach(col => {
    const th = document.createElement("th");

    if (FILTERABLE_COLUMNS[col.key]) {
      const labelSpan = document.createElement("span");
      labelSpan.textContent = col.label;

      const iconSpan = document.createElement("span");
      iconSpan.textContent = "▾";
      iconSpan.className = "filter-icon";

      th.appendChild(labelSpan);
      th.appendChild(iconSpan);

      th.onclick = (e) => {
        e.stopPropagation();

        if (th.querySelector("select")) return;

        th.innerHTML = "";

        const select = document.createElement("select");
        select.innerHTML = `
          <option value="">All</option>
          ${getUniqueValues(originalData.rows, col.key)
            .map(v => `<option value="${v}">${v}</option>`)
            .join("")}
        `;
        select.value = activeFilters[col.key] || "";

        select.onchange = () => {
          activeFilters[col.key] = select.value;
          applyFilters();
        };

        select.onblur = () => {
          th.innerHTML = "";
          th.appendChild(labelSpan);
          th.appendChild(iconSpan);
        };

        th.appendChild(select);
        select.focus();
      };
    } else {
      th.textContent = col.label;
    }

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  /* ---------- BODY ---------- */
  const tbody = document.createElement("tbody");

  filteredRows.forEach(row => {
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

document.addEventListener("DOMContentLoaded", () => {
  renderTable(fallback);
});
