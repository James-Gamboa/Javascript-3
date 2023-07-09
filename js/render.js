import { state } from "../modules/state.js";
import { removeFromList } from "./myaccount.js";
import { getEventsFromCache } from "../modules/eventCache.js";

export function renderEventsWithActions(event, tab, showRemoveButton, updateEventList) {
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

  const favoritesButton = document.createElement("button");
  favoritesButton.innerHTML = '<i class="far fa-heart"></i>';
  favoritesButton.addEventListener("click", () => {
    if (state.getList("favorites").includes(event)) {
      state.removeFromList(event, "favorites");
      favoritesButton.innerHTML = '<i class="far fa-heart"></i>';
    } else {
      state.addToList(event, "favorites");
      favoritesButton.innerHTML = '<i class="fas fa-heart"></i>';
    }
  });
  eventItem.appendChild(favoritesButton);

  const interestedButton = document.createElement("button");
  interestedButton.innerText = "Interested";
  interestedButton.addEventListener("click", () => {
    if (state.getList("interested").includes(event)) {
      state.removeFromList(event, "interested");
      interestedButton.innerText = "Interested";
    } else {
      state.addToList(event, "interested");
      interestedButton.innerText = "Not Going";
    }
  });
  eventItem.appendChild(interestedButton);

  const goingButton = document.createElement("button");
  goingButton.innerText = "Going!";
  goingButton.addEventListener("click", () => {
    if (state.getList("going").includes(event)) {
      state.removeFromList(event, "going");
      goingButton.innerText = "Going!";
    } else {
      state.addToList(event, "going");
      state.removeFromList(event, "interested");
      goingButton.innerText = "Not Interested";
    }
  });
  eventItem.appendChild(goingButton);

  const favoritesList = state.getList("favorites");
  const interestedList = state.getList("interested");
  const goingList = state.getList("going");

  if (favoritesList.includes(event)) {
    favoritesButton.innerHTML = '<i class="fas fa-heart"></i>';
  }

  if (interestedList.includes(event)) {
    interestedButton.innerText = "Not Going";
  }

  if (goingList.includes(event)) {
    goingButton.innerText = "Not Interested";
  }

  if (showRemoveButton) {
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("remove");
    removeButton.addEventListener("click", () => {
      removeFromList(event, tab);
      if (updateEventList) {
        updateEventList();
      }
    });
    eventItem.appendChild(removeButton);
  }

  return eventItem;
}

export const renderEvents = (events, tab, showRemoveButton = false, updateEventList = null) => {
  const eventsCategory = document.getElementById("events");
  eventsCategory.innerHTML = "";

  if (events.length === 0 && tab !== "calendar") {
    const message = document.createElement("p");
    message.innerText = `There are no events in your ${tab}`;
    eventsCategory.appendChild(message);
  } else {
    events.forEach((event) => {
      const eventItem = renderEventsWithActions(event, tab, showRemoveButton, updateEventList);
      eventsCategory.appendChild(eventItem);
    });
  }
};

export const renderEventCard = (event) => {
  const eventCard = renderEventsWithActions(event, "event-card", false, null);

  const buttons = eventCard.querySelectorAll("button");
  buttons.forEach((button) => button.remove());

  eventCard.classList.remove("event-item");
  eventCard.classList.add("event-card");
  return eventCard;
};

export const renderEventsByCategory = async (category) => {
  const events = await getEventsFromCache(category);
  renderEvents(events, category);
};