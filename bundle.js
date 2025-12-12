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

function getRiskClass(text = "") {
  const match = text.match(/\b([1-5])\b/);
  if (!match) return "";
  const score = Number(match[1]);
  if (score <= 2) return "risk-low";
  if (score === 3) return "risk-medium";
  return "risk-high";
}

function getUniqueValues(rows, key) {
  return [...new Set(rows.map(r => r[key]).filter(Boolean))];
}

function applyFilters() {
  filteredRows = originalData.rows.filter(row =>
    Object.entries(activeFilters).every(
      ([key, value]) => !value || row[key] === value
    )
  );
  renderTable();
}

function closeAllDropdowns() {
  document.querySelectorAll(".filter-dropdown").forEach(d => d.remove());
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

      iconSpan.onclick = (e) => {
        e.stopPropagation();
        closeAllDropdowns();

        const dropdown = document.createElement("div");
        dropdown.className = "filter-dropdown";

        const header = document.createElement("div");
        header.className = "filter-dropdown-header";
        header.textContent = `Filter by ${col.label}`;
        dropdown.appendChild(header);

        const allOption = document.createElement("div");
        allOption.className = "filter-option";
        allOption.textContent = "All";
        allOption.onclick = () => {
          activeFilters[col.key] = "";
          applyFilters();
          dropdown.remove();
        };
        dropdown.appendChild(allOption);

        getUniqueValues(originalData.rows, col.key).forEach(value => {
          const option = document.createElement("div");
          option.className = "filter-option";
          option.textContent = value;

          if (activeFilters[col.key] === value) {
            option.classList.add("active");
          }

          option.onclick = () => {
            activeFilters[col.key] = value;
            applyFilters();
            dropdown.remove();
          };

          dropdown.appendChild(option);
        });

        iconSpan.appendChild(dropdown);

        /* Flip dropdown if it overflows right edge */
        requestAnimationFrame(() => {
          const rect = dropdown.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
        
          if (rect.right > viewportWidth - 8) {
            dropdown.style.left = "auto";
            dropdown.style.right = "0";
            dropdown.style.transform = "none";
          }
        });
      };

      th.appendChild(labelSpan);
      th.appendChild(iconSpan);
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

/* ---------- INITIAL FALLBACK ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderTable(fallback);
});

/* ---------- CLOSE DROPDOWN ON OUTSIDE CLICK ---------- */
document.addEventListener("click", closeAllDropdowns);

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
