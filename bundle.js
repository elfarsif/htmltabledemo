
(() => {
  // Simulated bundled data
  const data = [
    {
      item: "Neovim",
      type: "Tooling",
      notes: "Stable + LSP config updates"
    },
    {
      item: "FastAPI",
      type: "Backend",
      notes: "Run locally or via Docker"
    }
  ];

  function renderTable(rows) {
    const tbody = document.querySelector("#data-table tbody");
    if (!tbody) return;

    rows.forEach(row => {
      const tr = document.createElement("tr");

      const tdItem = document.createElement("td");
      tdItem.textContent = row.item;

      const tdType = document.createElement("td");
      tdType.textContent = row.type;

      const tdNotes = document.createElement("td");
      tdNotes.textContent = row.notes;

      tr.appendChild(tdItem);
      tr.appendChild(tdType);
      tr.appendChild(tdNotes);

      tbody.appendChild(tr);
    });
  }

  // Entry point (like a real bundle)
  document.addEventListener("DOMContentLoaded", () => {
    renderTable(data);
  });
})();
