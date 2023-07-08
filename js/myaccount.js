// @ts-nocheck
import { renderEvents } from "./render.js";
import { state } from "../modules/state.js";
import { tabOptions } from "../modules/tabOptions.js";
import { renderCalendar } from "../modules/calendar.js";

const today = new Date();
const tabsContainer = document.getElementById("tabs");
const calendarContainer = document.getElementById("calendar");

const renderTabsOption = () => {
  tabOptions.forEach((tabOption) => {
    const tab = document.createElement("li");
    tab.textContent = tabOption.name;
    tab.setAttribute("data-tab", tabOption.category);
    tabsContainer.appendChild(tab);
  });
};

const getEventsByTab = (tab) => {
  return state.getList(tab);
};

const removeFromList = (event, tab) => {
  state.removeFromList(event, tab);
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
  if (Array.isArray(events)) {
    renderEvents(events, tab, true, removeFromList, updateEventList);
  }
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

tabsContainer.addEventListener("click", (event) => {
  const tab = event.target.getAttribute("data-tab");
  if (tab === "calendar") {
    calendarContainer.style.display = "block";
    renderEvents([], tab);
    renderCalendar(today.getMonth(), today.getFullYear());
  } else {
    calendarContainer.style.display = "none";
  }
});


renderTabsOption();

export { removeFromList };