// @ts-nocheck
import { fetchPlantInfo } from "./apiUtils.js";

async function renderPlantDescription() {
  const plantName = document.querySelector('select[name="plantName"]').value;
  const plantInfo = await fetchPlantInfo(plantName);

  const plantDescriptionAccordion = document.getElementById("plantDescription");
  plantDescriptionAccordion.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Plant Description";
  plantDescriptionAccordion.appendChild(title);

  const description = document.createElement("p");
  description.textContent = plantInfo.description;
  plantDescriptionAccordion.appendChild(description);
}

async function renderCareTips() {
  const plantName = document.querySelector('select[name="plantName"]').value;
  const plantInfo = await fetchPlantInfo(plantName);

  const careTipsAccordion = document.getElementById("careTips");
  careTipsAccordion.innerHTML = "";

  const title = document.createElement("h3");
  title.textContent = "Caring Tips";
  careTipsAccordion.appendChild(title);

  const careList = document.createElement("ul");
  const careDetails = plantInfo.care;
  for (const key in careDetails) {
    const careItem = document.createElement("li");
    const careItemTitle = document.createElement("strong");
    careItemTitle.textContent =
      key.charAt(0).toUpperCase() + key.slice(1) + ": ";
    careItem.appendChild(careItemTitle);
    careItem.appendChild(document.createTextNode(careDetails[key]));
    careList.appendChild(careItem);
  }

  careTipsAccordion.appendChild(careList);
}

export { renderPlantDescription, renderCareTips };
