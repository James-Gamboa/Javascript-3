import state from "../modules/state.js";
import { renderEvents } from "./render.js";

const tabsContainer = document.getElementById("tabs");

const renderTabs = () => {
  const tabs = tabsContainer.querySelectorAll("li");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const selectedTab = tab.getAttribute("data-tab");
      renderEventsByTab(selectedTab);
    });
  });
};

const renderEventsByTab = (tab) => {
  const events = getEventsByTab(tab);
  renderEvents(events, tab, true);
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
};

renderTabs();
renderEventsByTab();
export { removeFromList };