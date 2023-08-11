// @ts-nocheck
import { fetchInventory, fetchPlantInfo } from "../utils/apiUtils.js";
class Middleware {
  constructor(customizationData) {
    this.customizationData = customizationData;
    this.inventoryResults = [];
  }

  async fetchInventoryData() {
    const promises = [
      fetchInventory("extras", this.customizationData.extras),
      fetchInventory("soil", this.customizationData.soil),
      fetchInventory("potMaterial", this.customizationData.potMaterial),
      fetchInventory("potStyle", this.customizationData.potStyle),
      fetchInventory("potColor", this.customizationData.potColor),
      fetchInventory("plant", this.customizationData.name),
    ];

    this.inventoryResults = await Promise.all(promises);
  }

  async fetchPlantInfo() {
    this.plantInfo = await fetchPlantInfo(this.customizationData.name);
  }
}

export { Middleware };
