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
  questionContainer = document.querySelector('.question');
  
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

const eventsArr = [];

// Holidays
setEvents(1, 1, "New Year's Day")
setEvents(6, 1, "Kings Day")
setEvents(14, 2, "San Valentine's day")

// Birthdays
setEvents(5, 1, "Sebastian's Birthday")
setEvents(4, 3, "Joleth's Birthday")
setEvents(26, 3, "Daniel's Birthday")
setEvents(1, 4, "Nicole's Birthday")
setEvents(4, 4, "Carlos' Birthday")
setEvents(1, 6, "Nathalia's Birthday")
setEvents(7, 6, "Andriy's Birthday")
setEvents(12, 6, "Bruno's Birthday")
setEvents(24, 6, "Edgar's Birthday")
setEvents(26, 6, "Daniel's Birthday")
setEvents(11, 7, "Vianca's Birthday")
setEvents(26, 7, "Alonso's Birthday")
setEvents(26, 7, "Emiliano's Birthday")
setEvents(28, 7, "Gilberto's Birthday")
setEvents(11, 8, "Fernando's Birthday")
setEvents(27, 9, "Paul's Birthday")
setEvents(6, 10, "Emiliano's Birthday")
setEvents(17, 10, "Vanessa's Birthday")
setEvents(7, 11, "Jaime's Birthday")
setEvents(11, 11, "Sarai's Birthday")
setEvents(23, 11, "Angel's Birthday")

function setEvents(d, m, t) {
  eventsArr.push(
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
    temp = randomly(0, questions.length);

    if(i == 0) {
      randomlyQuestions.push(
        {
          day: questions[temp].day,
          month: questions[temp].month,
          question: questions[temp].question
        }
      )
    } else if(randomlyQuestions[i - 1].question != questions[i].question) {
      randomlyQuestions.push(
        {
          day: questions[temp].day,
          month: questions[temp].month,
          question: questions[temp].question
        }
      )
    }
  }
  
  eventsContainer.style.display = "none";
  eventDay.style.display = "none"
  eventDate.style.display = "none"
  questionContainer.style.display = "none"

  console.log(randomlyQuestions);
}

function randomly(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
