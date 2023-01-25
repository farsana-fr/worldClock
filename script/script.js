function selectTZ() {
  selectedLoc = document.querySelector(".form-select").value;
  fetch(`https://worldtimeapi.org/api/timezone/${selectedLoc}`)
    .then((data) => data.json())
    .then((data) => displayRes(data));
}

function displayRes(data) {
  //the API is providing only the number of week like 1 for Monday, hence to ease the process of taking out Day, the below week variable is used
  week = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  };
  displaySec = document.querySelector(".displayContent");

  //Store all necessary data Starts
  daylightSaving = data.dst ? "Yes" : "No";
  timeZone = data.timezone;
  time = data.datetime;
  day = data.week_number;
  abbrev = data.abbreviation;
  day_ofW = data.day_of_week;
  date = time.slice(0, time.indexOf("T"));
  //The date is in YYYY/MM/DD format, so will have to reverse it or find a way to write in DD/MM/YYYY
  year = date.split("-")[0];
  month = date.split("-")[1];
  date = date.split("-")[2];
  //Get the time
  clock = time.slice(time.indexOf("T") + 1, time.indexOf("."));
  standard = time.slice(time.indexOf("+"));
  //Store all necessary data Ends

  displaySec.innerHTML = `
    <div class="displayTime container text-center text-light mt-5 border rounded-5 p-4">
                <h1 class="timeNow mb-5 mt-5">${clock} ${abbrev}</h1>
            </div>
                <div class="mt-5 other">
                    <h1 class="">Daylight Saving: ${daylightSaving}</h1>
                    <h1 class="">Timezone: ${timeZone}(GMT${standard})</h1>
                    <h1 class="">Date: ${date}/${month}/${year}</h1>
                    <h1 class="">Day: ${week[day_ofW]}</h1>
                </div>
    `;
}
