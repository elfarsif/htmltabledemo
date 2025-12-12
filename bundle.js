
// LISTEN FOR THE EXISTING PAYLOAD (NO PAYLOAD CHANGES)
window.addEventListener("message", (event) => {
  // Do NOT block on origin unless required by your platform
  const data = event.data;

  console.log(data);

  
});
