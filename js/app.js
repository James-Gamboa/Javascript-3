// @ts-nocheck
import { getEventsByCategory } from "../modules/api.js";
import { renderEventsByCategory } from "./render.js";
import { getEventsFromCache, setEventsInCache } from "../modules/eventCache.js";
import {tabCategories} from "../modules/tabCategories.js";

const tabsContainer = document.getElementById("tabs");

const renderTabs = () => {
  tabCategories.forEach((category) => {
    const tab = document.createElement("li");
    tab.textContent = category.name;
    tab.setAttribute("data-category", category.category);
    tabsContainer.appendChild(tab);
  });

  const myAccountTab = document.createElement("li");
  const myAccountLink = document.createElement("a");
  myAccountLink.href = "myaccount.html";
  myAccountLink.textContent = "My Account";
  myAccountTab.appendChild(myAccountLink);
  tabsContainer.appendChild(myAccountTab);

  const tabElements = tabsContainer.children;
  for (let i = 0; i < tabElements.length; i++) {
    const tab = tabElements[i];
    if (
      !tab.getAttribute("data-category") &&
      !tab.querySelector("a[href='myaccount.html']")
    ) {
      tabsContainer.removeChild(tab);
      i--;
    }
  }
};

tabsContainer.addEventListener("click", async (event) => {
  const category = event.target.getAttribute("data-category");

  if (category) {
    let events = getEventsFromCache(category);

    if (!events) {
      events = await getEventsByCategory(category);
      setEventsInCache(category, events);
    }

    renderEventsByCategory(category, events);
  }
});

renderTabs();