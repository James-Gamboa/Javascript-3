// @ts-nocheck
import { getEventsByCategory } from "../modules/api.js";
import { renderEventsByCategory } from "./render.js";
import { getEventsFromCache, setEventsInCache } from "../modules/eventCache.js";

const categories = [
  { name: "Music", category: "music" },
  { name: "Sports", category: "sports" },
  { name: "Business", category: "business" },
  { name: "Food", category: "food" },
  { name: "Art", category: "art" },
];

const tabsContainer = document.getElementById("tabs");

const renderTabs = () => {
  categories.forEach((category) => {
    const tab = document.createElement("li");
    tab.textContent = category.name;
    tab.setAttribute("data-category", category.category);
    tabsContainer.appendChild(tab);
  });
};

tabsContainer.addEventListener("click", async (event) => {
  const category = event.target.getAttribute("data-category");

  if (category) {
    let events = getEventsFromCache(category);

    if (events.length === 0) {
      events = await getEventsByCategory(category);
      setEventsInCache(category, events);
    }

    renderEventsByCategory(category);
  }
});

renderTabs();