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
      renderRecommendation(plant);
    }
  });

document.getElementById("clearBtn").addEventListener("click", clearForm);
