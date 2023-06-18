// @ts-nocheck
import state from "../modules/state.js";
import { removeFromList } from "./myaccount.js";
import { getEventsFromCache } from "../modules/eventCache.js";

export default function renderEventsWithActions(events, tab, showRemoveButton, updateEventList) {
  const eventsCategory = document.getElementById("events");
  eventsCategory.innerHTML = "";

  events.forEach((event) => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item");
    eventItem.setAttribute("data-event-id", event.id);

    const image = document.createElement("img");
    image.src = event.image;
    eventItem.appendChild(image);

    const title = document.createElement("h1");
    title.innerText = event.title;
    eventItem.appendChild(title);

    const date = new Date(event.date);
    const formattedDate = `${date.toLocaleString("en-US", {
      weekday: "long",
    })}, ${date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
    })}, ${date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
    const dateElement = document.createElement("p");
    dateElement.innerText = formattedDate;
    eventItem.appendChild(dateElement);

    const locationElement = document.createElement("p");
    locationElement.innerText = `${event.location.city} • ${event.location.state}, ${event.location.address}`;
    eventItem.appendChild(locationElement);

    const price = document.createElement("span");
    price.innerText = event.price === 0 ? "Free" : `$${event.price.toFixed(2)}`;
    eventItem.appendChild(price);

    if (showRemoveButton) {
      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      removeButton.addEventListener("click", () => {
        removeFromList(event, tab);
        if (updateEventList) {
          updateEventList();
        }
      });
      eventItem.appendChild(removeButton);
    } else {
      const favoritesButton = document.createElement("button");
      favoritesButton.innerHTML = '<i class="far fa-heart"></i>';
      favoritesButton.addEventListener("click", () => {
        if (state.getFavorites().includes(event)) {
          state.removeFromFavorites(event);
          favoritesButton.innerHTML = '<i class="far fa-heart"></i>';
        } else {
          state.addToFavorites(event);
          favoritesButton.innerHTML = '<i class="fas fa-heart"></i>';
        }
      });
      eventItem.appendChild(favoritesButton);

      const interestedButton = document.createElement("button");
      interestedButton.innerText = "Interested";
      interestedButton.addEventListener("click", () => {
        if (state.getInterested().includes(event)) {
          state.removeFromInterested(event);
          interestedButton.innerText = "Interested";
        } else {
          state.addToInterested(event);
          interestedButton.innerText = "Remove";
        }
      });
      eventItem.appendChild(interestedButton);

      const goingButton = document.createElement("button");
      goingButton.innerText = "Going!";
      goingButton.addEventListener("click", () => {
        if (state.getGoing().includes(event)) {
          state.removeFromGoing(event);
          goingButton.innerText = "Going!";
        } else {
          state.addToGoing(event);
          state.removeFromInterested(event);
          goingButton.innerText = "Remove";
        }
      });
      eventItem.appendChild(goingButton);
    }

    eventsCategory.appendChild(eventItem);
  });
}

export const renderEvents = (events, tab) => {
  const eventsCategory = document.getElementById("events");
  eventsCategory.innerHTML = "";

  if (events.length === 0) {
    const message = document.createElement("p");
    message.innerText = `There are no events in your ${tab}`;
    eventsCategory.appendChild(message);
  } else {
    renderEventsWithActions(events, tab);
  }
};

export const renderEventsByCategory = async (category) => {
  const events = await getEventsFromCache(category);
  renderEvents(events, category);
};