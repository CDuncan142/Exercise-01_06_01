/*  Exercise 01_06_01

    Snoot JS validation
    Javascript form validation functions for snoot.html

    Filename: snoot.js
    Author: Conner Duncan
    Date:   08.06.18
*/

"use strict";

var twentyNine = document.createDocumentFragment();
alert(twentyNine);
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();

//function to turn off select list defaults

function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

//function to set up document fragments for days of month
function setUpDays(){
    //get the days option tage
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

//function to update the 'days' select list
function updateDays() {
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivyMo");
    var deliveryYear = document.getElementById("delivyYr");
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryMonth.selectedIndex === -1) {
        deliveryMonth.selectedIndex = 0;
    }
    // if feb and 2020 - leap year twentyNine
    
    //else 30 day month - thirty
    
    //else 31 day month - thirtyOne
        
}

//functions to run on page load
function setUpPage() {
    removeSelectDefaults();
//    setUpDays();
//    updateDays();
}

//enable load event handlers

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}
