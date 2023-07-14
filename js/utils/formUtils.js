// @ts-nocheck
function clearForm() {
  const form = document.getElementById("plantForm");
  form.reset();

  const recommendationContainer = document.getElementById("recommendation");
  recommendationContainer.innerHTML = "";
}

export { clearForm };
