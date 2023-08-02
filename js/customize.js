// @ts-nocheck
import { setupEventHandlers } from "./modules/eventHandlers.js";
import { getFormValues } from "./utils/formUtils.js";
import { renderRecommendation } from "./modules/renderRecommendation.js";

document.addEventListener("DOMContentLoaded", () => {
  setupEventHandlers();
  updatePreview();
});

function updatePreview() {
  const customizeData = getFormValues();
  if (customizeData.name) {
    renderRecommendation(customizeData);
  }
}
