function getPlantImageName(plantName) {
  switch (plantName) {
    case "Low Light Plant":
      return "plant-sansevieria";
    case "Medium Light Plant":
      return "plant-aglaonema";
    case "Outdoor Plant":
      return "plant-aloe";
    case "Non-Toxic Plant":
      return "plant-fern";
    case "Toxic Plant":
      return "plant-peace-lily";
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
