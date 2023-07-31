// @ts-nocheck
import { CustomizationObserver } from "./modules/customizationObserver.js";
import { renderRecommendation } from "./modules/renderRecommendation.js";

function isCustomizePage() {
  return !!document.getElementById("customizeForm");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customizeForm");
  const previewContainer = document.getElementById("preview");
  const colorOptions = document.getElementById("colorOptions");

  const customizationObserver = new CustomizationObserver();

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

  function updatePreview() {
    const customizeData = getFormValues();
    if (customizeData.name) {
      renderRecommendation(customizeData, previewContainer);
      const customizeBtn = document.getElementById("customizeBtn");
      if (customizeBtn) {
        if (isCustomizePage()) {
          customizeBtn.style.display = "none";
        } else {
          customizeBtn.style.display = "block";
        }
      }
    }
  }

  customizationObserver.subscribe(updatePreview);

  form.addEventListener("change", () => {
    customizationObserver.notify();
  });

  const toggleColor = form.querySelector('input[name="potColor"]');
  toggleColor.addEventListener("change", () => {
    if (toggleColor.value === "yes") {
      colorOptions.style.display = "block";
    } else {
      colorOptions.style.display = "none";
    }
    customizationObserver.notify();
  });

  updatePreview();
});
