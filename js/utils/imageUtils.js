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
      return "plant-peace-lily-toxic";
    case "Non-Toxic Plant (Medium Light)":
      return "plant-monstera";
    case "Toxic Plant (Medium Light)":
      return "plant-peace-lily-toxic";
    case "Non-Toxic Plant (Outdoor)":
      return "plant-cactus";
    case "Toxic Plant (Outdoor)":
      return "plant-aloe-toxic";
    default:
      return "";
  }
}

function getPotImageName(material, style, color) {
  let potName = `simple-${material}-pot`;

  if (style === "decorated") {
    potName += "-decorated";
  } else if (style === "bright-colors") {
    potName = `painted-${material}-pot-decorated`;
  }

  if (color === "yes") {
    potName += `-${color}`;
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
    default:
      return "";
  }
}
function getSoilImageName(soilType) {
  switch (soilType) {
    case "fertilized":
      return "soil-fertilized";
    case "drainage":
      return "soil-drainage";
    case "composted":
      return "soil-composted";
    default:
      return ""; 
  }
}

export { getPlantImageName, getPotImageName, getExtraImageName, getSoilImageName };
