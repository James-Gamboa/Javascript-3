function getPlantImageName(plantName) {
  switch (plantName) {
    case "Low Light Plants":
      return "plant-sansevieria";
    case "Medium Light Plants":
      return "plant-aglaonema";
    case "Outdoor Plants":
      return "plant-aloe";
    case "Non-Toxic Plant (Low Light)":
      return "plant-fern";
    case "Toxic Plant (Low Light)":
      return "plant-peace-lily";
    case "Non-Toxic Plant (Medium Light)":
      return "plant-monstera";
    case "Toxic Plant (Medium Light)":
      return "plant-peace-lily";
    case "Non-Toxic Plant (Outdoor)":
      return "plant-cactus";
    case "Toxic Plant (Outdoor)":
      return "plant-aloe";
    default:
      return "";
  }
}

function getPotImageName(material, style) {
  let potName = `simple-${material}-pot`;

  if (style === "decorated") {
    potName += "-decorated";
  } else if (style === "bright-colors") {
    potName = `painted-${material}-pot-decorated`;
  }

  return potName;
}

function getExtraImageName(extra) {
  switch (extra) {
    case "moss-pole":
      return "moss-pole";
    case "pebbles":
      return "pebbles";
    case "mini-plants":
      return "mini-plants";
  }
}

export { getPlantImageName, getPotImageName, getExtraImageName };
