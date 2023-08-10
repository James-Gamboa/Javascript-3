// @ts-nocheck
import { updateFormFromURLParams } from "./utils/formUtils.js";
import { CustomizationObserver } from "./modules/customizationObserver.js";
import { renderCustomizationPreview } from "./modules/renderCustomizationPreview.js";
import { getPotImageName, getPlantImageName } from "./utils/imageUtils.js";

const customizationObserver = new CustomizationObserver();
const customizationPreview = document.getElementById("customizationPreview");

document.addEventListener("DOMContentLoaded", function () {
  updateFormFromURLParams();
  updateColorOptionsDisplay();

  const recommendedPlantData = JSON.parse(
    sessionStorage.getItem("recommendedPlant")
  );
  if (recommendedPlantData) {
    renderCustomizationPreview(recommendedPlantData);
    customizationObserver.notify();

    document.querySelector('select[name="plantName"]').value =
      recommendedPlantData.name;
    document.querySelector(
      `input[name="soil"][value="${recommendedPlantData.soil}"]`
    ).checked = true;
    document.querySelector(
      `input[name="potMaterial"][value="${recommendedPlantData.potMaterial}"]`
    ).checked = true;
    document.querySelector(
      `input[name="potDecorations"][value="${recommendedPlantData.potStyle}"]`
    ).checked = true;
    document.querySelector(
      `input[name="potColor"][value="${recommendedPlantData.potColor}"]`
    ).checked = true;
    recommendedPlantData.extras.forEach((extra) => {
      document.querySelector(
        `input[name="extras"][value="${extra}"]`
      ).checked = true;
    });
  }

  customizationObserver.subscribe(customizationPreview);
});

document
  .getElementById("customizeForm")
  .addEventListener("change", function () {
    const selectedPlant = document.querySelector(
      'select[name="plantName"]'
    ).value;
    const potMaterial = document.querySelector(
      'input[name="potMaterial"]:checked'
    ).value;
    const potDecorations = document.querySelector(
      'input[name="potDecorations"]:checked'
    ).value;
    const potColor = document.querySelector(
      'input[name="potColor"]:checked'
    ).value;

    const potImage = `Assets/${getPotImageName(
      potMaterial,
      potDecorations,
      potColor
    )}.png`;
    const plantImage = `Assets/${getPlantImageName(selectedPlant)}.png`;

    const customizationData = {
      name: selectedPlant,
      soil: document.querySelector('input[name="soil"]:checked').value,
      potMaterial,
      potStyle: potDecorations,
      potColor,
      extras: Array.from(
        document.querySelectorAll('input[name="extras"]:checked')
      ).map((input) => input.value),
      plantImage,
      potImage,
    };

    renderCustomizationPreview(customizationData);
    customizationObserver.notify();

    updateColorOptionsDisplay();
  });

function updateColorOptionsDisplay() {
  const colorOptionsDiv = document.getElementById("colorOptions");
  const potColorInput = document.querySelector(
    'input[name="potColor"]:checked'
  );

  if (potColorInput && potColorInput.value === "yes") {
    colorOptionsDiv.style.display = "block";
  } else {
    colorOptionsDiv.style.display = "none";
  }
}

document.getElementById("checkAvailabilityBtn").addEventListener("click", function () {
  const customizationData = {
    name: document.querySelector('select[name="plantName"]').value,
    soil: document.querySelector('input[name="soil"]:checked').value,
    potMaterial: document.querySelector('input[name="potMaterial"]:checked').value,
    potStyle: document.querySelector('input[name="potDecorations"]:checked').value,
    potColor: document.querySelector('input[name="potColor"]:checked').value,
    extras: Array.from(document.querySelectorAll('input[name="extras"]:checked')).map((input) => input.value),
  };
  sessionStorage.setItem("customizationData", JSON.stringify(customizationData));
  window.location.href = "products.html";
});