import renderEventsWithActions from "./render.js";
import state from "../modules/state.js";

const tabs = document.querySelectorAll(".tabs li");

const getEventsByTab = (tab) => {
  switch (tab) {
    case "favorites":
      return state.getFavorites();
    case "interested":
      return state.getInterested();
    case "going":
      return state.getGoing();
    default:
      return [];
  }
};

function removeFromList(event, tab) {
  switch (tab) {
    case "favorites":
      state.removeFromFavorites(event);
      break;
    case "interested":
      state.removeFromInterested(event);
      break;
    case "going":
      state.removeFromGoing(event);
      break;
    default:
      break;
  }
}

const updateEventList = () => {
  const activeTab = document.querySelector(".tabs li.active");
  if (activeTab) {
    const tab = activeTab.getAttribute("data-tab");
    renderEventsByTab(tab);
  }
};

const renderEventsByTab = (tab) => {
  const events = getEventsByTab(tab);
  renderEventsWithActions(events, tab, removeFromList, updateEventList);
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const activeTab = document.querySelector(".tabs li.active");
    if (activeTab) {
      activeTab.classList.remove("active");
    }
    tab.classList.add("active");
    renderEventsByTab(tab.getAttribute("data-tab"));
  });
});

renderEventsByTab("favorites");

export { removeFromList };