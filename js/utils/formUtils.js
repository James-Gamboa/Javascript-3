// @ts-nocheck
function clearForm() {
  const form = document.getElementById("plantForm");
  form.reset();

  const recommendationContainer = document.getElementById("recommendation");
  recommendationContainer.innerHTML = "";
}

function getFormValues() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const potMaterial = params.get("potMaterial");
  const potDecorations = params.get("potDecorations");
  const potColor = params.get("potColor");
  const colorOption = params.get("colorOption");
  const soil = params.get("soil");
  const extras = params.getAll("extras");
  const potStyle = params.get("potStyle");

  return {
    name,
    potMaterial,
    potDecorations,
    potColor,
    colorOption,
    soil,
    extras,
    potStyle,
  };
}

export { clearForm , getFormValues};
