/*  Exercise 01_06_01

    Snoot JS validation
    Javascript form validation functions for snoot.html

    Filename: snoot.js
    Author: Conner Duncan
    Date:   08.06.18
*/

"use strict";

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
//var formValidity = true;
var formValidity = false;
//var x = something;
/*try {
    allert("try");
} catch (err) {
    alert("caught: " + err);
}*/

//function to turn off select list defaults

function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

//function to set up document fragments for days of month
function setUpDays() {
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
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryYear.selectedIndex = 0;
    }
    // if feb and 2020 - leap year twentyNine
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }
    // else 30 day month - thirty
    else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));
    }
    // else 31 day month - thirtyOne
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}
// function to copy delivery to billing address
function copyBillingAddress() {
    var billingInputElements = document.querySelectorAll("#billingAddress input");
    var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
    //if checkbox checked - copy all fields
    if (document.getElementById("sameAddr").checked) {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = billingInputElements[i].value;
        }
        document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
    }
    //else erase all fields
    else {
        for (var i = 0; i < billingInputElements.length; i++) {
            deliveryInputElements[i + 1].value = "";
        }
        document.querySelector("#deliveryAddress select").selectedIndex = -1;
    }
}

//functions to run on page load
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

//function to validate both address fields
function validateAddress(fieldsetId) {
    //note: all indexs off by one
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement = null;
    try {
        //loop required input elements
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            //test for blank
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255, 233, 233)";
                fieldsetValidity = false;
            } else { //removes error background
                currentElement.style.background = "white"
            }

        }
        // validate select list
        currentElement = document.querySelectorAll("#" + fieldsetId + " select")[0];
        //blank
        if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        //valid
        else {
            currentElement.style.border = "1px solid white";
        }
        if (fieldsetValidity === false) {
            if (fieldsetId === "billingAddress") {
                throw "please complete all Billing Address information"
            } else {
                throw "please complete all Delivery Address information"
            }
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;

    }
}
// function to see if custom message is checked
function autoCheckCustom() {
    var messageBox = document.getElementById("customText");

    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) { //textarea contains user inputed characters 
        document.getElementById("custom").checked = "checked";
    } else { // textarea is empty
        document.getElementById("custom").checked = "";
    }
}
//function to validate delivery date
function validateDeliveryDate() {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement = null;
    try {
        //loop required input elements
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            //test for blank
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else { //removes error background
                currentElement.style.border = "";
            }

        }
        if (fieldsetValidity === false) {
            throw "please specify a delivery date";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;

    }
}

// function to validate payment
function validatePayment() {
    var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = true;
    // get radio buttons
    var cards = document.getElementsByName("PaymentType");
    var ccNumElement = document.getElementById("ccNum");
    //\/\\
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var currentElement = null;
    try {
        // check radio buttons for required at least 1 checked
        if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        } else {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "";
            }
        }
        // check car number_format
        if (ccNumElement.value === "") {
            ccNumElement.style.backgroundColor = "rgb(255, 233, 233)";
        } else {
            ccNumElement.style.backgroundColor = "white";
        }
        //validate expiration date fields
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else { //removes error background
                currentElement.style.border = "";
            }

        }

        //check cvv number
        if (cvvElement.value === "") {
            cvvElement.style.backgroundColor = "rgb(255, 233, 233)";
        } else {
            cvvElement.style.backgroundColor = "white";
        }
        if (fieldsetValidity === false) {
            throw "Please complete all Payment info.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;

    }
}

// function to validate payment
function validatePayment() {
    var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = true;
    // get radio buttons
    var cards = document.getElementsByName("PaymentType");
    var ccNumElement = document.getElementById("ccNum");
    //\/\\
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var currentElement = null;
    try {
        // check radio buttons for required at least 1 checked
        if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        } else {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "";
            }
        }
        // check car number_format
        if (ccNumElement.value === "") {
            ccNumElement.style.backgroundColor = "rgb(255, 233, 233)";
        } else {
            ccNumElement.style.backgroundColor = "white";
        }
        //validate expiration date fields
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else { //removes error background
                currentElement.style.border = "";
            }

        }

        //check cvv number
        if (cvvElement.value === "") {
            cvvElement.style.backgroundColor = "rgb(255, 233, 233)";
        } else {
            cvvElement.style.backgroundColor = "white";
        }
        if (fieldsetValidity === false) {
            throw "Please complete all Payment info.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }

    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;

    }
}

// validate custom message
function validateMessage() {
    var msgBox = document.getElementById("customText");
    var errorDiv = document.querySelectorAll("#message" + " .errorMessage")[0];
    var fieldsetValidity = true;
    try {
        if (document.getElementById("custom").checked && ((msgBox.value === "") || (msgBox.value === msgBox.placeHolder))) {
            throw "Please enter your Message text.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.style.background = "white";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msgBox.style.background = "rgb(255, 233, 233)";
        formValidity = false;

    }
}
// validate create account
function validateCreateAccount() {
    var errorDiv = document.querySelectorAll("#createAccount" + " .errorMessage")[0];
    var usernameElement = document.getElementById("username");
    var pass1Element = document.getElementById("pass1");
    var pass2Element = document.getElementById("pass2");
    usernameElement.style.background = "white";
    pass1Element.style.background = "white";
    pass2Element.style.background = "white";
    var passwordMismatch = false;
    var invColor = "rgb(255, 233, 233)";
    var fieldsetValidity = true;
    try {
        if (usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== "") {
            if (pass1Element.value !== pass2Element.value) {
                passwordMismatch = true;
                throw "Passwords entered do not match, please re-enter."
            }
        } else if (usernameElement.value === "" && pass1Element.value === "" && pass2Element.value === "") {
            fieldsetValidity === true;
        } else {
            fieldsetValidity === false;
            throw "Please enter all fields to Create Account"
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        pass1Element.style.background = invColor;
        pass2Element.style.background = invColor;
        formValidity = false;
        if (passwordMismatch) {
            usernameElement.style.background = "white";
        } else {
            usernameElement.style.background = invColor;
        }
    }
}



//function to validate entire form
function validateEntireForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }

    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateDeliveryDate();
    validatePayment();
    validateMessage()
    validateCreateAccount();


    if (formValidity === true) {
        document.getElementById("errorText").innerHTML = "";
        document.getElementById("errorText").style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    } else {
        document.getElementById("errorText").innerHTML = "Please fix the indeixated problems and the resubmit your order";
        document.getElementById("errorText").style.display = "block";
        window.scroll(0, 0);
    }
}

// function to create event listeners
function createEventListeners() {
    var deliveryMonth = document.getElementById("delivMo");
    if (deliveryMonth.addEventListener) {
        deliveryMonth.addEventListener("change", updateDays, false);
    } else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays);
    }
    var deliveryYear = document.getElementById("delivYr");
    if (deliveryYear.addEventListener) {
        deliveryYear.addEventListener("change", updateDays, false);
    } else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays);
    }
    var messageBox = document.getElementById("customText");
    if (messageBox.addEventListener) {
        messageBox.addEventListener("change", autoCheckCustom, false);
    } else if (messageBox.attachEvent) {
        messageBox.attachEvent("onchange", autoCheckCustom);
    }
    var same = document.getElementById("sameAddr");
    if (same.addEventListener) {
        same.addEventListener("change", copyBillingAddress, false);
    } else if (same.attachEvent) {
        same.attachEvent("onchange", copyBillingAddress);
    }
    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateEntireForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateEntireForm);
    }
}

//enable load event handlers

if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}
