const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  gameContainer = document.querySelector(".game"),
  initGameContainer = document.querySelector('.init-game');
  
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

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

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const holidays = [];
const birthdays = [];
const eventsArr = [];

// Holidays
setHolidays(1, 1, "New Year's Day")
setHolidays(6, 1, "Kings Day")
setHolidays(24, 1, "World Education Day")
setHolidays(5, 2, "Day of the Political Constitution of Mexico")
setHolidays(10, 2, "Day of the Mexican Air Force")
setHolidays(14, 2, "San Valentine's day")
setHolidays(24, 2, "Flag Day")
setHolidays(8, 3, "International Women's Day")
setHolidays(18, 3, "Day of oil expropiation")
setHolidays(7, 4, "World Health Day")
setHolidays(18, 4, "Holy Week, Holy Thurday and Friday")
setHolidays(19, 4, "Holy Week, Holy Thurday and Friday")
setHolidays(30, 4, "Children's Day")
setHolidays(1, 5, "Labor Day")
setHolidays(5, 5, "Battle of Puebla")
setHolidays(10, 5, "Mother's Day")
setHolidays(15, 5, "Teacher's Day")
setHolidays(23, 5, "Students Day")
setHolidays(1, 6, "National Navy Day")
setHolidays(8, 6, "World Oceans Day")
setHolidays(18, 6, "(Third Sunday of the month) Father's Day")
setHolidays(11, 5, "World Population Day")

// Birthdays
setBirthdays(5, 1, "Sebastian's Birthday")
setBirthdays(4, 3, "Joleth's Birthday")
setBirthdays(21, 3, "Birthday of Benito Juárez")
setBirthdays(26, 3, "Daniel's Birthday")
setBirthdays(1, 4, "Nicole's Birthday")
setBirthdays(4, 4, "Carlos' Birthday")
setBirthdays(1, 6, "Nathalia's Birthday")
setBirthdays(7, 6, "Andriy's Birthday")
setBirthdays(12, 6, "Bruno's Birthday")
setBirthdays(24, 6, "Edgar's Birthday")
setBirthdays(26, 6, "Daniel's Birthday")
setBirthdays(11, 7, "Vianca's Birthday")
setBirthdays(26, 7, "Alonso's Birthday")
setBirthdays(26, 7, "Emiliano's Birthday")
setBirthdays(28, 7, "Gilberto's Birthday")
setBirthdays(11, 8, "Fernando's Birthday")
setBirthdays(27, 9, "Paul's Birthday")
setBirthdays(6, 10, "Emiliano's Birthday")
setBirthdays(17, 10, "Vanessa's Birthday")
setBirthdays(7, 11, "Jaime's Birthday")
setBirthdays(11, 11, "Sarai's Birthday")
setBirthdays(23, 11, "Angel's Birthday")

function setBirthdays(d, m, t) {
  birthdays.push(
    {
      day: d,
      month: m,
      year: 2023,
      events: [{
        title: t,
        time: '00:00 AM'
      }]
    }
  )
}

function setHolidays(d, m, t) {
  birthdays.push(
    {
      day: d,
      month: m,
      year: 2023,
      events: [{
        title: t,
        time: '00:00 AM'
      }]
    }
  )
}

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  eventsArr.push(...holidays, ...birthdays);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month++;
    // month = 11;
    // year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month--;
    // month = 0;
    // year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  // if (dateInput.value.length === 2) {
  //   dateInput.value += "/";
  // }
  if (dateInput.value.length > 2) {
    dateInput.value = dateInput.value.slice(0, 2);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
//   console.log("here");
//  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 /*&& dateArr[1].length === 4 && (dateArr[1] == 2023)*/) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("You can only move around 2023");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

//function to save events in local storage
function saveEvents() {
  if(localStorage.getItem("events") === null) {
    localStorage.setItem("events", JSON.stringify(eventsArr));
  }
}

function convertTime(time) {
  //convert time to 24 hour format
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}

const POINTSLIFE = 3
const questions = []

// Possible questions
setQuestions(1, 1, "Today we have grapes, beer and a count from 10 to 0. We start another year")
setQuestions(6, 1, "Who will break the thread today?")
setQuestions(1, 14, "The perfect day to be rejected in an epic way… You can bring chocolates, letters, give kisses…")
setQuestions(8, 3, "The feminist girls are going to go crazy today... It's their day, and of all women, you know what I mean")
setQuestions(18, 4, "Jesus died.")
setQuestions(30, 4, "Children receive gifts from adults... Why?  because they are kids!!!")
setQuestions(1, 5, "Nobody works today!!!  because it's a work day")
setQuestions(5, 5, "would you like to go to town?  but bring your gun please...")
setQuestions(10, 5, "We better bring flowers to our mother...")
setQuestions(16, 6, "We better take something for dad, or he'll feel bad in his day...")
setQuestions(2, 10, "Today is to remember that we must be peaceful")
setQuestions(24, 10, "196 countries joined today")
setQuestions(31, 10, "We need to find a suitable costume NOW!  IT'S OCTOBER")
setQuestions(2, 11, "today we must make an altar and use salt to protect our house!")
setQuestions(20, 11, "The land belongs to anyone who works on it!  Francisco I Madero once said, at the time to…")
setQuestions(3, 12, "Yes, but we need a day for differently-abled people, right?")
setQuestions(25, 12, "Santa Claus is coming to the town...")
setQuestions(28, 12, "My mother died... JUST KIDDING!!")

function setQuestions(d, m, q) {
  questions.push(
    {
      day: d,
      month: m,
      question: q
    }
  )
}

function game() {
  let pl = POINTSLIFE
  let randomlyQuestions = []
  let temp = 0

  for(let i = 0; i < 5; i++) {
    temp = randomly(0, questions.length - 1);

    if(i == 0) {
      randomlyQuestions.push(
        {
          day: questions[temp].day,
          month: questions[temp].month,
          question: questions[temp].question
        }
      )
    } else if(randomlyQuestions[i - 1].question != questions[temp].question) {
      randomlyQuestions.push(
        {
          day: questions[temp].day,
          month: questions[temp].month,
          question: questions[temp].question
        }
      )
    } else {
      i--;
    }
  }
  
  eventsContainer.style.display = "none";
  eventDay.style.display = "none"
  eventDate.style.display = "none"
  initGameContainer.style.display = "none"
  gameContainer.style.display = "flex"

  
}

function randomly(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
