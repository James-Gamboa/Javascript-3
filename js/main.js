// @ts-nocheck
import { getPlantRecommendation } from "./modules/recommendationLogic.js";
import { renderRecommendation } from "./modules/renderRecommendation.js";
import { clearForm } from "./utils/formUtils.js";

document
  .getElementById("plantForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const plant = getPlantRecommendation();
    if (plant) {
      sessionStorage.setItem("recommendedPlant", JSON.stringify(plant));
      renderRecommendation(plant);
    }
  });

document.getElementById("clearBtn").addEventListener("click", clearForm);

document
  .getElementById("recommendation")
  .addEventListener("click", function (event) {
    const customizeBtn = event.target.closest("#customizeBtn");
    if (customizeBtn) {
      const plant = JSON.parse(sessionStorage.getItem("recommendedPlant"));
      if (plant) {
        const params = new URLSearchParams(plant);
        params.set("potStyle", "clay");
        window.location.href = `customize.html?${params.toString()}`;
      }
    }
  });
