// @ts-nocheck
import { renderEvents } from "./render.js";
import state from "../modules/state.js";

const tabsContainer = document.getElementById("tabs");

const tabOptions = [
  { name: "Favorites", category: "favorites" },
  { name: "Interested", category: "interested" },
  { name: "Going", category: "going" },
];

const renderTabsOption = () => {
  tabOptions.forEach((tabOption) => {
    const tab = document.createElement("li");
    tab.textContent = tabOption.name;
    tab.setAttribute("data-tab", tabOption.category);
    tabsContainer.appendChild(tab);
  });
};

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

const removeFromList = (event, tab) => {
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

  renderEventsByTab(tab);
};

const updateEventList = () => {
  const activeTab = document.querySelector(".tabs li.active");
  if (activeTab) {
    const tab = activeTab.getAttribute("data-tab");
    renderEventsByTab(tab);
  }
};

const renderEventsByTab = (tab) => {
  const events = getEventsByTab(tab);
  renderEvents(events, tab, true, removeFromList, updateEventList);
};

tabsContainer.addEventListener("click", (event) => {
  const tab = event.target.getAttribute("data-tab");
  if (tab) {
    const activeTab = document.querySelector(".tabs li.active");
    if (activeTab) {
      activeTab.classList.remove("active");
    }
    event.target.classList.add("active");
    renderEventsByTab(tab);
  }
});

renderTabsOption();

export { removeFromList };