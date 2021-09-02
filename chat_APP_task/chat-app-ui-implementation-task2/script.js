"use strict";
var count = 0;

function uuids() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
var valueToClearTimer;
function countdown(amount = 0) {
    var seconds = amount;
    function tick() {
        var counter = document.getElementById("timer");
        seconds--;
        counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
        if (seconds > 0) {
            valueToClearTimer= setTimeout(tick, 1000);
        } else {
            clearTimeout(valueToClearTimer);
            logout();
        }
    }
    tick();
}

const validateName = function (name) {
    // if the name string not empty then it will remove spaces in the beginning and at the end of it 

    if (name === "") {
        alert("Name must be filled out");
        return false;
    } else return true;
};
const getName = function (name) {
    name = name.trim().toLowerCase();
    return name;
    //alert("please enter a valid name ");


};

const addUser = function (userName) {
    //save data in local storage -- increase users count 
    // Retrieve the object from storage
    // var flag=false;
    // if (localStorage.length > 0) {
    //     for (var i = localStorage.length - 1; i >= 0; i--) {
    //         var retrievedKey = localStorage.key(i);
    //         var savedName = localStorage.getItem(retrievedKey);
    //         if (savedName === userName) flag=true;
    //             console.log('retrievedObject: ', savedName);
    //     }
    // }

    var Name = userName;
    var ID = uuids();
    localStorage.setItem(ID, Name);
    count++;
};
const checkIfGroupExists = function (group_name) {
    return false;
};
const addGroup = function (group_name) {
    //save data in local storage -- subscribe to pusher
};
const addUserAndGroup = function () {
    let name = document.querySelector('#user-name').value;
    let groupName = document.querySelector('#Group-name').value;
    if ((validateName(groupName)) && (validateName(name))) {
        name = getName(name);
        groupName = getName(groupName);
        addUser(name);
        //hide login div
        document.querySelector('#intro').style.display = "none";
        //if the group not exists before then add it  else show chat
        if (!(checkIfGroupExists(groupName) === true)) {
            addGroup(groupName);
        }
        //show chat ui div
        document.querySelector('#chat').style.display = "block";
        clearTimeout()
        countdown(60);
    }
    else {
        document.querySelector('#intro').style.display = "block";
        document.querySelector('#chat').style.display = "none";
        alert("please fill all inputs ");
    }
};

const show_users_messages = function (user_message, dateTime) {
    let parent = document.querySelector('#main-message-body');
    let new_div = document.createElement("div");
    new_div.classList.add('message-container');


    let new_p = document.createElement("p");
    new_p.setAttribute('class', 'text-left');

    let user_text = document.createTextNode(user_message);
    new_p.appendChild(user_text);
    new_div.appendChild(new_p);

    let message_time = document.createElement("span");
    message_time.classList.add('float-left');
    let user_text_time = document.createTextNode(dateTime);
    message_time.appendChild(user_text_time);
    new_div.appendChild(message_time);


    parent.appendChild(new_div);
};

const show_my_message = function (my_message, dateTime) {
    let parent = document.querySelector('#main-message-body');
    let new_div = document.createElement("div");
    new_div.classList.add('message-container');


    let new_p = document.createElement("p");
    new_p.setAttribute('class', 'text-right');
    let user_text = document.createTextNode(my_message);
    new_p.appendChild(user_text);
    new_div.appendChild(new_p);


    let message_time = document.createElement("span");
    message_time.classList.add('float-right');
    let user_text_time = document.createTextNode(dateTime);
    message_time.appendChild(user_text_time);
    new_div.appendChild(message_time);


    parent.appendChild(new_div);
};

const send = function () {
    console.log("send");
    clearTimeout(valueToClearTimer);
    countdown(60);
    var textarea = document.querySelector('#message');
    var my_message = '(You)' + ':' + textarea.value;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    //show_users_messages(my_message, dateTime);
    show_my_message(my_message, dateTime);
    textarea.value = " ";
};
const logout = function () {
    console.log("logout ");
    //unsubscribe  clear browser storage  back to first screen
    count--;
    localStorage.clear();
    document.querySelector('#intro').style.display = "block";
    document.querySelector('#chat').style.display = "none";
};

/*to add a new line when enter and alt is pressed */
const keyboardActions = function (e) {
    var textarea = document.querySelector('#message');
    if ((e.key == "Enter") && (e.altKey == true)) {
        textarea.value = textarea.value + "\n";
    } else if (e.keyCode == 13) {
        send();
    }

};

document.querySelector('#add-data').addEventListener("click", addUserAndGroup);
//countdown calls logout automaticlly when seconds is zero
document.querySelector('#logout').addEventListener("click", countdown);
document.querySelector('#send').addEventListener("click", send);
document.querySelector('#message').addEventListener("keydown", keyboardActions);