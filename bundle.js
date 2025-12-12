

document.addEventListener("DOMContentLoaded", () => {
   const root = document.getElementById("root");

  if (root) {
    root.textContent = "hello";
  }
});

window.addEventListener("message", (event) => {
  console.log("event from agent os");
});
