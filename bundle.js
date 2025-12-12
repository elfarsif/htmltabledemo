

document.addEventListener("DOMContentLoaded", () => {
   const root = document.getElementById("root");

  if (root) {
    root.textContent = "hello";
  }
});

window.addEventListener("message", (event) => {
  const root = document.getElementById("root");

  if (root) {
    root.textContent = "hello agentos"+event.data;
  }});
