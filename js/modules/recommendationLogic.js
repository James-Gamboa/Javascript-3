// @ts-nocheck
import { PlantBuilder } from "../modules/plantBuilder.js";
import { getPlantImageName, getExtraImageName } from "../utils/imageUtils.js";
import { getRealPlantName } from "../utils/getNamePlantsUtils.js";

function getPlantRecommendation() {
  const form = document.getElementById("plantForm");
  const placement = form.querySelector('input[name="placement"]:checked');
  const sunlight = form.querySelector('input[name="sunlight"]:checked');
  const pets = form.querySelector('input[name="pets"]:checked');
  const watering = form.querySelector('input[name="watering"]:checked');
  const style = form.querySelector('input[name="style"]:checked');
  const extras = Array.from(
    form.querySelectorAll('input[name="extras"]:checked'),
  ).map((input) => input.value);

  if (!placement || !sunlight || !pets || !watering || !style) {
    alert("Please complete the form before generating a recommendation.");
    return null;
  }

  let plantBuilder = new PlantBuilder();

  switch (placement.value) {
    case "inside-indirect":
      plantBuilder.withName("Low Light Plant");
      break;
    case "inside-lot-indirect":
      plantBuilder.withName("Medium Light Plant");
      break;
    case "outside":
      plantBuilder.withName("Outdoor Plant");
      break;
  }

  switch (sunlight.value) {
    case "yes":
      plantBuilder.withSoil("Composted Soil");
      break;
    case "no":
      plantBuilder.withSoil("Fertilized Soil");
      break;
  }

  switch (pets.value) {
    case "yes":
      plantBuilder.withName("Non-Toxic Plant");
      break;
    case "no":
      plantBuilder.withName("Toxic Plant");
      break;
  }

  switch (watering.value) {
    case "overwater":
      plantBuilder
        .withPotMaterial("Clay")
        .withSoil("Drainage Soil")
        .withPlantImage(
          getPlantImageName(getRealPlantName(plantBuilder.getName())),
        );
      break;
    case "underwater":
    case "neither":
      plantBuilder.withPotMaterial("Ceramic");
      break;
  }

  switch (style.value) {
    case "minimalism":
      plantBuilder.withPotStyle("Simple");
      break;
    case "decoration":
      plantBuilder.withPotStyle("Simple").withPotStyle("decorated");
      break;
    case "bright-colors":
      plantBuilder.withPotStyle("Painted").withPotStyle("decorated");
      break;
  }

  plantBuilder
    .withPotColor("clay")
    .withExtras(extras.map((extra) => getExtraImageName(extra)));

  const plantResult = plantBuilder.build();
  return plantResult;
}

export { getPlantRecommendation };
