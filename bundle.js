

document.addEventListener("DOMContentLoaded", () => {
   const root = document.getElementById("root");

  if (root) {
    root.textContent = "hello";
  }
});

window.addEventListener("message", (event) => {
  const root = document.getElementById("root");
  if (!root) return;

  root.textContent =
    "hello agentos\n\n" +
    JSON.stringify(event.data, null, 2);
                       
);
