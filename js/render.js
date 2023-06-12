// @ts-nocheck
import { getEventsFromCache } from "../modules/eventCache.js";

const renderEvents = (events) => {
  const eventsCategory = document.getElementById("events");
  eventsCategory.innerHTML = "";

  events.forEach((event) => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item");

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

    eventsCategory.appendChild(eventItem);
  });
};

export const renderEventsByCategory = async (category) => {
  const events = await getEventsFromCache(category);
  renderEvents(events);
};