//*********************************************************************************get request***************************************************************************/

$.ajaxSetup({ async: false });
let userData = [];
const url1 = "https://reqres.in/api/users?page=1";
const url2 = "https://reqres.in/api/users?page=2";
$.get(url1, function (data, status) {
  console.log(data.data);
  // console.log(typeof data.data);
  let dataArr = data.data;
  userData.push(...dataArr);
});
$.get(url2, function (data, status) {
  console.log(data.data);
  // console.log(typeof data.data);
  let dataArr = data.data;
  userData.push(...dataArr);
});
console.log(userData);

//*********************************************************************************filling the pages***************************************************************************/

function addToMain(obj) {
  $("#mainContainer").append(
    `<div class="col-12 col-sm-6 col-md-4 p-2">
          <div class="card">
            <img
              src=${obj.avatar}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${obj.first_name} ${obj.last_name} </h5>
              <p class="card-text">ID:${obj.id}
              </p>
              <p class="card-text">EMAIL:${obj.email}
              </p>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary" onclick="fillModal(${obj.id})">Edit</button>
            </div>
          </div>
        </div>
          `
  );
}

function fillPageOne() {
  for (let i = 0; i <= 5; i++) {
    addToMain(userData[i]);
  }
}
function fillPageTwo() {
  for (let i = 6; i <= userData.length; i++) {
    addToMain(userData[i]);
  }
}
fillPageOne();

//*********************************************************************************pagination***************************************************************************/
$("#btnFirstPage").click(function () {
  $("#mainContainer").html("");
  fillPageOne();
});

$("#btnSecondPage").click(function () {
  $("#mainContainer").html("");
  fillPageTwo();
});
//*********************************************************************************Modal functionality***************************************************************************/
function fillModal(id) {
  $("#modalId").prop("readonly", true);
  $("#modalHeader").html("Update Existing User");
  let obj = userData.find((e) => e.id === id);
  $("#modalId").val(id);
  $("#modalFirstName").val(obj.first_name);
  $("#modalLastName").val(obj.last_name);
  $("#modalEmail").val(obj.email);
  $("#image").val();
  $("#delBtn").css("display", "block");
  $("#saveBtn").attr("name", "update");
}

function showCreateModal() {
  $("#modalId").prop("readonly", false);
  $("#modalHeader").html("Create New User");
  $("#modalId").val("");
  $("#modalFirstName").val("");
  $("#modalLastName").val("");
  $("#modalEmail").val("");
  $("#image").val("");
  $("#delBtn").css("display", "none");
  $("#saveBtn").attr("name", "create");
}

function readForm() {
  let obj = {};
  obj["id"] = $("#modalId").val();
  obj["email"] = $("#modalEmail").val();
  obj["first_name"] = $("#modalFirstName").val();
  obj["last_name"] = $("#modalLastName").val();
  obj["avatar"] = $("#image").val();
  obj["avatar"] = obj["avatar"].replace(/^.*\\/, "");
  //   console.log(obj);
  let type = $("#saveBtn").attr("name");
  if (type === "create") {
    validateCreate(obj);
  } else if (type === "update") {
    validateUpdate(obj);
  }
}

function validateCreate(obj) {
  if (isNaN(obj.id)) {
    alert("id should be a number!");
    return;
  }

  if (
    !obj.id ||
    !obj.first_name ||
    !obj.last_name ||
    !obj.email ||
    !obj.avatar
  ) {
    alert("invalid input");
    return;
  }
  let targetPerson = userData.find((el) => el.id == obj.id);
  if (targetPerson) {
    alert("duplicate uid");
    return;
  }
  obj.id = Number(obj.id);
  userData.push(obj);
  console.log(userData);
  $("#exampleModal").modal("toggle");
  showCreate();
}

function validateUpdate(obj) {
  obj.id = Number(obj.id);
  let target = userData.find((e) => e.id === obj.id);
  let targetIndex = userData.indexOf(target);
  target["first_name"] = obj.first_name;
  target["last_name"] = obj.last_name;
  target["email"] = obj.email;
  if (obj.avatar !== "") {
    target["avatar"] = obj.avatar;
  }

  $("#exampleModal").modal("toggle");
  showUpdate(targetIndex);
  // console.log(targetIndex);
  // console.log(target);
  // console.log(userData);
}

function deleteUser() {
  let targetId = $("#modalId").val();
  let targetPerson = userData.find((el) => el.id == targetId);
  let targetIndex = userData.indexOf(targetPerson);
  userData = userData.filter((el) => el.id != targetId);
  // console.log(userData);
  // console.log(targetPerson);
  // console.log(targetIndex);
  $("#exampleModal").modal("toggle");
  showUpdate(targetIndex);
}
//*********************************************************************************showing new users***************************************************************************/
function showCreate() {
  if (userData.length > 6) {
    $("#mainContainer").html("");
    fillPageTwo();
  } else if (userData.length <= 6) {
    $("#mainContainer").html("");
    fillPageOne();
  }
}

function showUpdate(index) {
  if (index <= 5) {
    $("#mainContainer").html("");
    fillPageOne();
  } else if (index > 5) {
    $("#mainContainer").html("");
    fillPageTwo();
  }
}

