// @ts-nocheck
import { CustomizationObserver } from "../modules/customizationObserver.js";

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

function updateFormFromURLParams() {
  const params = new URLSearchParams(window.location.search);
  const form = document.getElementById("customizeForm");

  const potMaterial = params.get("potMaterial");
  const potDecorations = params.get("potDecorations");
  const potColor = params.get("potColor");
  const colorOption = params.get("colorOption");
  const plantName = params.get("plantName");
  const soil = params.get("soil");
  const extras = params.getAll("extras");

  if (potMaterial) {
    const potMaterialInput = form.querySelector(
      `input[name="potMaterial"][value="${potMaterial}"]`,
    );
    if (potMaterialInput) {
      potMaterialInput.checked = true;
    }
  }

  if (potDecorations) {
    const potDecorationsInput = form.querySelector(
      `input[name="potDecorations"][value="${potDecorations}"]`,
    );
    if (potDecorationsInput) {
      potDecorationsInput.checked = true;
    }
  }

  if (potColor) {
    const potColorInput = form.querySelector(
      `input[name="potColor"][value="${potColor}"]`,
    );
    if (potColorInput) {
      potColorInput.checked = true;
    }
  }

  if (colorOption) {
    const colorOptions = document.getElementById("colorOptions");
    const colorOptionInput = colorOptions.querySelector(
      `input[name="colorOption"][value="${colorOption}"]`,
    );
    if (colorOptionInput) {
      colorOptionInput.checked = true;
      colorOptions.style.display = "block";
    }
  }

  if (plantName) {
    const plantNameSelect = form.querySelector('select[name="plantName"]');
    if (plantNameSelect) {
      plantNameSelect.value = plantName;
    }
  }

  if (soil) {
    const soilInput = form.querySelector(`input[name="soil"][value="${soil}"]`);
    if (soilInput) {
      soilInput.checked = true;
    }
  }

  if (extras.length > 0) {
    const extrasInputs = form.querySelectorAll('input[name="extras"]');
    extrasInputs.forEach((input) => {
      if (extras.includes(input.value)) {
        input.checked = true;
      }
    });
  }

  const customizationObserver = new CustomizationObserver();
  customizationObserver.notify();
}

export { clearForm, getFormValues, updateFormFromURLParams };
