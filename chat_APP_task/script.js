"use strict";

const addUserAndGroup = function () {
    console.log("add user and group");
    document.querySelector('#intro').style.display = "none";
    document.querySelector('#chat').style.display = "block";

};

const logout = function () {
    console.log("logout ");
};

const send = function () {
    console.log("send")
};

/*to add a new line when enter and alt is pressed */
const keyboardActions = function (e) {
    var textarea = document.querySelector('#message');
    if (e.keyCode == 13) {
        send();
    }
    if ((e.key == "Enter") && (e.altKey == true)) {
        textarea.value = textarea.value + "\n";
    }
};

document.querySelector('#add-data').addEventListener("click", addUserAndGroup);
document.querySelector('#logout').addEventListener("click", logout);
document.querySelector('#send').addEventListener("click", send);
document.querySelector('#message').addEventListener("keydown", keyboardActions);