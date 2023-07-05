// @ts-nocheck
const state = {
  favorites: [],
  interested: [],
  going: [],

  addToFavorites(event) {
    event.color = "pink";
    this.favorites.push(event);
    this.saveState();
  },

  removeFromFavorites(event) {
    this.favorites = this.favorites.filter((e) => e.id !== event.id);
    this.saveState();
  },

  getFavorites() {
    return this.favorites;
  },

  addToInterested(event) {
    event.color = "yellow";
    this.interested.push(event);
    this.saveState();
  },

  removeFromInterested(event) {
    this.interested = this.interested.filter((e) => e.id !== event.id);
    this.saveState();
  },

  getInterested() {
    return this.interested;
  },

  addToGoing(event) {
    event.color = "green";
    this.going.push(event);
    this.saveState();
  },

  removeFromGoing(event) {
    this.going = this.going.filter((e) => e.id !== event.id);
    this.saveState();
  },

  getGoing() {
    return this.going;
  },

  saveState() {
    localStorage.setItem("state", JSON.stringify(this));
  },

  loadState() {
    const savedState = localStorage.getItem("state");
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      this.favorites = parsedState.favorites || [];
      this.interested = parsedState.interested || [];
      this.going = parsedState.going || [];
    }
  },
};

state.loadState();

export default state;