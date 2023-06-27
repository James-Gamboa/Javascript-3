// @ts-nocheck
const renderCalendar = (month, year) => {
  const calendar = document.querySelector("#calendar");
  let selectedDate = new Date(year, month , 0);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
  ];

  const lastDay = new Date(year, month + 1, 0);
  const numDays = lastDay.getDate();

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

  for (let i = 1; i <= numDays; i++) {
    const currentDate = new Date(year, month, i);
    const isSelected = currentDate.toDateString() === selectedDate.toDateString();

    calendarHTML += `
      <div class="day${isSelected ? " selected" : ""}" data-date="${currentDate.toDateString()}">
        <p class="day-number">${i}</p>
      </div>
    `;
  }

  calendarHTML += `</div>`;
  calendar.innerHTML = calendarHTML;

  calendar.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("prev")) {
      selectedDate.setMonth(selectedDate.getMonth() - 1);
      renderCalendar(selectedDate.getMonth(), selectedDate.getFullYear());
    } else if (target.classList.contains("next")) {
      selectedDate.setMonth(selectedDate.getMonth() + 1);
      renderCalendar(selectedDate.getMonth(), selectedDate.getFullYear());
    }
  });

  calendar.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("day")) {
      const selectedDayElement = calendar.querySelector(".selected");

      if (selectedDayElement) {
        selectedDayElement.classList.remove("selected");
      }

      target.classList.add("selected");

      const date = target.getAttribute("data-date");

      if (date) {
        selectedDate = new Date(date);
      }
    }
  });
};

export { renderCalendar };

