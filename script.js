var scheduleContainer = document.querySelector(".container");
var currentDay = $('#currentDay');
var saveScheduleArray = [];

//Reads and writes the date from moment.js
function getCurrentDay() {
    //sets text element to the date
    currentDay.text("Today's Date: " + moment().format("MMM Do YYYY"));
}

//pulls stored data from local storage
function getSchedule() {
    saveScheduleArray = JSON.parse(localStorage.getItem("scheduleArray"));
    //console.log(saveScheduleArray);
}

//stores data to local storage and also the saveScheduleArray
function storeSchedule(){
    //iterates through all schedule items and stores them in the array and local storage
    for (let i=0; i < 24; i++) {
        saveScheduleArray[i] = $("#" + i).children("input")[0].value; 
        //console.log($("#" + i).children("input")[0].value);
    }

    localStorage.setItem("scheduleArray", JSON.stringify(saveScheduleArray));
}

//writes in data from the saveScheduleArray onto page (useful for after we pull the data from storage)
function writeSchedule() {
    //console.log(saveScheduleArray);
    //uses the array to set the text values of the input fields to any data stored
    for (let i = 0; i < 24; i++){
        if (saveScheduleArray[i] != null){
            $("#" + i).children("input")[0].value = saveScheduleArray[i];
            //console.log(saveScheduleArray[i]);
        }
        
    }
}

//Adds the background colors based off of time from moment.js
function timeOrganizer() {
    //getting current time
    var hour = parseInt(moment().format('HH'));
    //sets forloop to iterate though until hitting current time
    for (let i = 0; i < hour; i++){
        //sets styling
        $("#" + i).addClass("past");
        $("#" + i).children().addClass("past");
    }

    //styling for current time
    $("#" + hour).addClass("present");
    $("#" + hour).children().addClass("present");

    //starts forloop one ahead of current time and iterates through to finish
    for (let i = hour + 1; i < 24; i++){
        //sets styling
        $("#" + i).addClass("future");
        $("#" + i).children().addClass("future");
    }    
}

//click event for the save buttons
scheduleContainer.addEventListener("click", function(event) {
    //event.preventDefault();
    var element = event.target;
  
    // Checks if element is a button
    if (element.matches("button") === true) {
        storeSchedule();
        //console.log(saveScheduleArray);
        writeSchedule();
        //console.log(localStorage.getItem("scheduleArray"));
    }
  });

//initial function calls
getCurrentDay();
timeOrganizer();
//check if there's data locally stored in so retrieve and write it
if (localStorage.getItem("scheduleArray") != null) {
    getSchedule();
    writeSchedule();
}

