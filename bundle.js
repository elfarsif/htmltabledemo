
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
