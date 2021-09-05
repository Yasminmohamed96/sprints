"use strict";
var count;
var globalName;
var globalID;
var group;
Pusher.logToConsole = true;
const pusher = new Pusher('fa7ee674664954c1f5be', {
    cluster: 'eu'
});
var channel;
function getMD5(body) {
    return CryptoJS.MD5(JSON.stringify(body));
}

function getAuthSignature(md5, timeStamp) {
    return CryptoJS.HmacSHA256(`POST\n/apps/1259459/events\nauth_key=fa7ee674664954c1f5be&auth_timestamp=${timeStamp}&auth_version=1.0&body_md5=${md5}`, "2d1293ec93e526dd6cf1");
}

let sendMessage = async function (othersMessage, group) {
    let body = { data: othersMessage, name: "my-event", channel: group }
    let timeStamp = Date.now() / 1000;
    let md5 = getMD5(body);
    let url = `https://cors.bridged.cc/https://api-eu.pusher.com/apps/1259459/events?body_md5=${md5}&auth_version=1.0&auth_key=fa7ee674664954c1f5be&auth_timestamp=${timeStamp}&auth_signature=${getAuthSignature(md5, timeStamp)}`;
    let req = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
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
            valueToClearTimer = setTimeout(tick, 1000);
        }
        else {
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
const ReturnOtherUserName = function (id) {
    // Retrieve the object from storage
    if (localStorage.length > 0) {
        count = localStorage.length - 1;
        for (var i = localStorage.length - 1; i >= 0; i--) {
            var retrievedKey = localStorage.key(i);
            var savedName = localStorage.getItem(retrievedKey);
            if (retrievedKey === id) {
                return savedName;
            }
        }
    }
};
const addUser = function (userName, groupName) {
    //save data in local storage -- increase users count
    globalName = userName;
    globalID = uuids();
    group = groupName;
    localStorage.setItem(globalID, globalName);
    count = localStorage.length - 1;
    console.log(pusher.allChannels());
};
const checkIfGroupExists = function (group_name) {
    return false;
};
const addGroup = function (group_name) {
    //save data in local storage -- subscribe to pusher
};
const addGroupNameAAndUserCountsToHtml = function (group, count) {

    let parent = document.querySelector('#users-count');//div
    let oldChild = document.querySelector('#child');//old h1
    let newChild = document.createElement("h1");//new h1
    newChild.setAttribute('class', 'h1');
    newChild.setAttribute('id', 'child');
    let text = document.createTextNode(group + ':  online users (' + count + ')');
    newChild.appendChild(text);
    parent.replaceChild(newChild, oldChild);

};
const addUserAndGroup = function () {
    let name = document.querySelector('#user-name').value;
    let groupName = document.querySelector('#Group-name').value;
    if ((validateName(groupName)) && (validateName(name))) {
        name = getName(name);
        groupName = getName(groupName);

        addUser(name, groupName);
        //hide login div
        document.querySelector('#intro').style.display = "none";
        //if the group not exists before then add it  else show chat
        if (!(checkIfGroupExists(groupName) === true)) {
            addGroup(groupName);
        }
        addGroupNameAAndUserCountsToHtml(groupName, count);
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
    debugger;
    user_message=user_message.split("\\n").join("   ");

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
    let break_ = document.createElement("br");
    parent.appendChild(break_);
};

const show_my_message = function (my_message, dateTime) {
    debugger;
    my_message=my_message.split("\\n").join("   ");
    let parent = document.querySelector('#main-message-body');
    let new_div = document.createElement("div");
    new_div.classList.add('message-container');


    let new_p = document.createElement("p");
    new_p.setAttribute('class', 'text-right');
    let user_text = document.createTextNode("(You)" + ':' + my_message);
    new_p.appendChild(user_text);
    new_div.appendChild(new_p);


    let message_time = document.createElement("span");
    message_time.classList.add('float-right');
    let user_text_time = document.createTextNode(dateTime);
    message_time.appendChild(user_text_time);
    new_div.appendChild(message_time);


    parent.appendChild(new_div);
    let break_ = document.createElement("br");
    parent.appendChild(break_);
};

const getDate=function(){
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
};
const send = function () {
    var dateTime=getDate();
    clearTimeout(valueToClearTimer);
     countdown(60);
    var textarea = document.querySelector('#message');
    var message = globalID + ',' + textarea.value;
    channel = pusher.subscribe(group);
    sendMessage(message, group);
    addGroupNameAAndUserCountsToHtml(group, count);
    channel.bind('my-event', function (data) {
        var receivedMessage;
        var id;
        var msg;
        var UserName;
        receivedMessage = (JSON.stringify(data));
        receivedMessage = receivedMessage.split(',');
        id = (receivedMessage[0].slice(1));
        msg= (receivedMessage[1].slice(0, -1));
        UserName = ReturnOtherUserName(id);
        if (globalID == id) {
            show_my_message(msg, dateTime);
            channel.unbind('my-event', handler);
        }
        else {

            show_users_messages('(' + UserName + ')' + msg, dateTime);
            channel.unbind('my-event', handler);
        }
    });
       textarea.value = " ";
};

const logout = function () {
    console.log("logout ");
    //unsubscribe  clear browser storage  back to first screen
    localStorage.removeItem(globalID);
    pusher.unsubscribe(group);
    if (localStorage.length - 1 == 0)
    { localStorage.clear();}
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
//countdown calls logout automatically when seconds is zero
document.querySelector('#logout').addEventListener("click", countdown);
document.querySelector('#send').addEventListener("click", send);
document.querySelector('#message').addEventListener("keydown", keyboardActions);