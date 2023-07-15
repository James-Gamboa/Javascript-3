class PlantBuilder {
  constructor() {
    this.properties = {
      name: "",
      soil: "",
      potMaterial: "",
      potStyle: "",
      potColor: "",
      extras: [],
      plantImage: "",
    };
  }

  withName(name) {
    this.properties.name = name;
    return this;
  }

  withSoil(soil) {
    this.properties.soil = soil;
    return this;
  }

  withPotMaterial(material) {
    this.properties.potMaterial = material;
    return this;
  }

  withPotStyle(style) {
    this.properties.potStyle = style;
    return this;
  }

  withPotColor(color) {
    this.properties.potColor = color;
    return this;
  }

  withExtras(extras) {
    this.properties.extras = extras;
    return this;
  }

  withPlantImage(plantImage) {
    this.properties.plantImage = plantImage;
    return this;
  }

  build() {
    return this.properties;
  }
}

export { PlantBuilder };
