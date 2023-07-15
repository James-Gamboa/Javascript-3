function getRealPlantName(genericName) {
  switch (genericName) {
    case "Low Light Plants":
      return "Sansevieria";
    case "Medium Light Plants":
      return "Aglaonema";
    case "Outdoor Plants":
      return "Aloe Vera";
    case "Non-Toxic Plant (Low Light)":
      return "Boston Fern";
    case "Toxic Plant (Low Light)":
      return "Peace Lily";
    case "Non-Toxic Plant (Medium Light)":
      return "Monstera";
    case "Toxic Plant (Medium Light)":
      return "Peace Lily";
    case "Non-Toxic Plant (Outdoor)":
      return "Cactus";
    case "Toxic Plant (Outdoor)":
      return "Aloe Vera";
  }
}

export { getRealPlantName };
