// @ts-nocheck
import state from "./state.js";

state.selectedDate = new Date();

const calendarContainer = document.getElementById("calendar");

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderCalendar(month, year) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(year, month, 1).getDay(); 
  const lastDay = new Date(year, month + 1, 0).getDate();
  const numDays = lastDay;

  let calendarHTML = `
    <div class="month">
      <div class="prev">&lt;</div>
      <div class="current-month">${months[month]} ${year}</div>
      <div class="next">&gt;</div>
    </div>
    <div class="days">
      <div class="day-labels">
  `;

  for (let i = 0; i < 7; i++) {
    calendarHTML += `<p>${daysOfWeek[i]}</p>`;
  }

  calendarHTML += `</div></div><div class="days-grid">`;

  for (let i = 0; i < firstDay; i++) {
    calendarHTML += `<div class="day empty"></div>`;
  }

  for (let i = 1; i <= numDays; i++) {
    const currentDate = new Date(year, month, i);
    const isSelected = state.selectedDate && currentDate.toDateString() === state.selectedDate.toDateString();

    calendarHTML += `
      <div class="day${isSelected ? " selected" : ""}" data-date="${currentDate.toDateString()}">
        <p class="day-number">${i}</p>
      </div>
    `;
  }

  calendarHTML += `</div>`;
  calendarContainer.innerHTML = calendarHTML;

  const favorites = state.getFavorites();
  const going = state.getGoing();
  const interested = state.getInterested();

  highlightEventDates(month, year);

  function highlightEventDates(month, year) {
    const days = calendarContainer.querySelectorAll(".day");

    days.forEach((day) => {
      const date = day.getAttribute("data-date");
      const eventsDate = formatDate(new Date(date));

      let hasFavorite = false;
      let hasGoing = false;
      let hasInterested = false;

      if (Array.isArray(favorites)) {
        favorites.forEach((event) => {
          if (event.html && event.html.includes(`data-event-date="${eventsDate}"`)) {
            hasFavorite = true;
          }
        });
      }

      if (Array.isArray(going)) {
        going.forEach((event) => {
          if (event.html && event.html.includes(`data-event-date="${eventsDate}"`)) {
            hasGoing = true;
          }
        });
      }

      if (Array.isArray(interested)) {
        interested.forEach((event) => {
          if (event.html && event.html.includes(`data-event-date="${eventsDate}"`)) {
            hasInterested = true;
          }
        });
      }

      if (hasFavorite) {
        day.classList.add("favorite");
      }

      if (hasGoing) {
        day.classList.add("going");
      }

      if (hasInterested) {
        day.classList.add("interested");
      }
    });
  }

  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  prevBtn.addEventListener("click", function () {
    state.selectedDate.setMonth(state.selectedDate.getMonth() - 1);
    renderCalendar(state.selectedDate.getMonth(), state.selectedDate.getFullYear());
  });

  nextBtn.addEventListener("click", function () {
    state.selectedDate.setMonth(state.selectedDate.getMonth() + 1);
    renderCalendar(state.selectedDate.getMonth(), state.selectedDate.getFullYear());
  });

  const days = calendarContainer.querySelectorAll(".day");

  days.forEach((day) => {
    day.addEventListener("click", () => {
      const date = day.getAttribute("data-date");

      if (date) {
        state.selectedDate = new Date(date);
        renderCalendar(state.selectedDate.getMonth(), state.selectedDate.getFullYear());
      }
    });
  });
}

export { renderCalendar };