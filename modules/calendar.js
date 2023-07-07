// @ts-nocheck
import { state } from "./state.js";
import { renderDayEvents,getEventsByDate, getEventColor} from "./eventsCalendar.js";

state.selectedDate = new Date();

const calendarContainer = document.getElementById("calendar");

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

    const dayEvents = getEventsByDate(currentDate);
    const eventColor = getEventColor(dayEvents);

    calendarHTML += `
      <div class="day${isSelected ? " selected" : ""}" data-date="${currentDate.toDateString()}">
        <p class="day-number">${i}</p>
        ${renderDayEvents(dayEvents, eventColor)}
      </div>
    `;
  }

  calendarHTML += `</div>`;
  calendarContainer.innerHTML = calendarHTML;

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