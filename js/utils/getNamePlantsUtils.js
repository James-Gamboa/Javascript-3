function getRealPlantName(genericName) {
  switch (genericName) {
    case "Low Light Plant":
      return "Sansevieria";
    case "Medium Light Plant":
      return "Aglaonema";
    case "Outdoor Plant":
      return "Aloe Vera";
    case "Non-Toxic Plant":
      return "Boston Fern";
    case "Toxic Plant":
      return "Peace Lily";
  }
}

export { getRealPlantName };
