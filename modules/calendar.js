// @ts-nocheck
import { renderEvents } from "../js/render.js";
import { getEventsFromCache } from "../modules/eventCache.js";
import state from "../modules/state.js";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calendarContainer = document.getElementById("calendar");
const calendarTitle = document.createElement("h2");
const previousMonthButton = document.createElement("button");
const nextMonthButton = document.createElement("button");
const overlay = document.createElement("div");
overlay.classList.add("overlay");
overlay.addEventListener("click", hideEventCard);
overlay.style.display = "none";

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let activeEvent = null;

calendarTitle.classList.add("calendar-title");
previousMonthButton.classList.add("calendar-button", "previous");
previousMonthButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
previousMonthButton.addEventListener("click", showPreviousMonth);
nextMonthButton.classList.add("calendar-button", "next");
nextMonthButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
nextMonthButton.addEventListener("click", showNextMonth);

calendarContainer.appendChild(calendarTitle);
calendarContainer.appendChild(previousMonthButton);
calendarContainer.appendChild(nextMonthButton);
calendarContainer.appendChild(overlay);

function renderCalendar() {
  const events = getEventsFromCache("calendar");
  const calendar = generateCalendar(currentMonth, currentYear, events);
  calendarContainer.appendChild(calendar);
}

function generateCalendar(month, year, events) {
  const calendar = document.createElement("div");
  calendar.classList.add("calendar");

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  calendarTitle.textContent = `${months[month]} ${year}`;

  const daysContainer = document.createElement("div");
  daysContainer.classList.add("days-container");

  // Render empty cells for previous month
  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("day", "empty");
    daysContainer.appendChild(emptyCell);
  }

  // Render days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateCell = document.createElement("div");
    dateCell.classList.add("day");
    dateCell.textContent = day;
    dateCell.addEventListener("click", () => showEventsForDay(day, month, year, events));
    daysContainer.appendChild(dateCell);
  }

  calendar.appendChild(daysContainer);
  return calendar;
}

function showEventsForDay(day, month, year, events) {
  const eventDate = new Date(year, month, day);
  const filteredEvents = events.filter(event => isSameDay(new Date(event.date), eventDate));
  renderEvents(filteredEvents);
}

function isSameDay(date1, date2) {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();
}

function showPreviousMonth() {
  currentMonth = (currentMonth - 1 + 12) % 12;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  clearCalendar();
  renderCalendar();
}

function showNextMonth() {
  currentMonth = (currentMonth + 1) % 12;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  clearCalendar();
  renderCalendar();
}

function clearCalendar() {
  while (calendarContainer.firstChild) {
    calendarContainer.firstChild.remove();
  }
}

function hideEventCard() {
  overlay.style.display = "none";
  if (activeEvent) {
    activeEvent.classList.remove("active");
    activeEvent = null;
  }
}
