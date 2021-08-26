//"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};
var editFlag=false;
var editTaskFlag=100000;

const editTask=function(i) {
  
  editFlag=true;
  editTaskFlag=i;
  renderTable();
};
const saveTask = function (i) {
  console.log(this);
  taskName= document.querySelector("#edit_task_name").value;
  priority= document.querySelector("#edit_task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks[i].name = taskName;
    tasks[i].priority = priority;
    editFlag=false;
    editTaskFlag=100000;
    renderTable();
  }
};

const cancelTask = function (i) {
  editFlag=false;
  editTaskFlag=100000;
  renderTable();
};
const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  let row='';
  tasks.forEach((t, i) => {
    if (editFlag===true && editTaskFlag=== i)
    {
      row = `
      <tr>
      <td>
      ${i + 1}
      </td>
      <td>
      <div class="col-md-5">
      <input type="text" id="edit_task_name"  name ="edit_task_name" placeholder="edit task name" class="form-control">
      </div>
      </td>
      <td>
      <div class="col-md-5">
      <select id="edit_task_priority"  class="form-control">
       <option value="1">High</option>
       <option value="2">Medium</option>
       <option value="3">Low</option>
      </select>
      </div>
      </td>
      <td>
      ${
        i > 0
          ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
          : ``
      }
      ${
        i < tasks.length - 1
          ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
          : ``
      }
      </td>
      <td>
      <button class="btn btn-success btn-sm" type ="submit" onclick="saveTask(${i});">Save</button>
      <button class="btn btn-danger btn-sm" onclick="cancelTask(${i});">Cancel</button>
      <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
      </tr>
      `;
    }
    else
    {
      row = `
      <tr>
      <td>${i + 1}</td>
      <td>${t.name}</td>
      <td>${getPriorityName(t.priority)}</td>
      <td>
      ${
        i > 0
          ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
          : ``
      }
      ${
        i < tasks.length - 1
          ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
          : ``
      }
      </td>
      <td>
      <button class="btn btn-primary btn-sm" onclick="editTask(${i});">Edit</button>
      <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
      </tr>
      `;
    }
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};
const addTask = function () {
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

document.querySelector("#add").addEventListener("click", addTask);
