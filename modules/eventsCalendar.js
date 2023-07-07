// @ts-nocheck
import { state } from "./state.js";

function getEventsByDate(date) {
  const events = state.favorites.concat(state.interested, state.going);
  const uniqueEvents = [];
  const eventIds = new Set();

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    if (eventDate.toDateString() === date.toDateString()) {
      if (!eventIds.has(event.id)) {
        uniqueEvents.push(event);
        eventIds.add(event.id);
      }
    }
  });

  return uniqueEvents;
}


function getEventColor(events) {
  let color = "";
  if (events.length > 0) {
    if (events.some((event) => state.going.includes(event))) {
      color = "green";
    } else if (events.some((event) => state.interested.includes(event))) {
      color = "yellow";
    } else {
      color = "pink";
    }
  }
  return color;
}

function renderDayEvents(events, color) {
  let eventsHTML = "";
  events.forEach((event) => {
    eventsHTML += `
      <p class="event" style="background-color: ${color};">${event.title}</p>
    `;
  });
  return eventsHTML;
}

export { getEventsByDate, getEventColor, renderDayEvents };
