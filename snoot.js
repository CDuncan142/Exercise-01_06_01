/*  Exercise 01_06_01

    Snoot JS validation
    Javascript form validation functions for snoot.html

    Filename: snoot.js
    Author: Conner Duncan
    Date:   08.06.18
*/

"use strict";

//function to turn off select list defaults

function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    alert(emptyBoxes.length);
    }

//enable load event handlers

if (window.addEventListener) {
    window.addEventListener("load", removeSelectDefaults, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", removeSelectDefaults);
}