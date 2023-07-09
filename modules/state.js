// @ts-nocheck
const state = {
  lists: {
    favorites: [],
    interested: [],
    going: [],
  },

  addToList(event, list) {
    this.lists[list].push(event);
    this.saveState();
  },

  removeFromList(event, list) {
    if (this.lists[list]) {
      this.lists[list] = this.lists[list].filter((e) => e.id !== event.id);
      this.saveState();
    }
  },

  getList(list) {
    return this.lists[list];
  },

  saveState() {
    localStorage.setItem("state", JSON.stringify(this.lists));
  },

  loadState() {
    const savedState = localStorage.getItem("state");
    if (savedState) {
      this.lists = JSON.parse(savedState);
    }
  },
};

state.loadState();

export { state };