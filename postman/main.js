//***********fire on submit */
function fire() {
  let method = getMethod();
  let urlCheck = checkUrl();

  let url = $("#url").val();
  if (urlCheck && method === "GET") {
    getRequest(url);
    //   console.log("POST");
  } else if (url && method === "POST") {
    let jsonCheck = isJson();
    if (jsonCheck) {
      postRequest(url);
    }
  }
}

//***************check inputs*********/
function getMethod() {
  let method = $("#select").val();
  if (method === "") {
    alert("choose a method!");
    return false;
  } else if (method === "POST") {
    return "POST";
  } else if (method === "GET") {
    return "GET";
  }
}
function checkUrl() {
  let url = $("#url").val();
  var res = url.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (!(res !== null)) {
    alert("invalid url");
    return false;
  }
  return res !== null;
}
function isJson(item = $("#requestTextarea").val()) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    alert("enter valid JSON format");
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}
function show() {
  let val = $("#select").val();
  if (val === "POST") {
    $("#requestTextDiv").css("display", "block");
  } else if (val === "GET") {
    $("#requestTextDiv").css("display", "none");
  }
}

//***********GET**********/
function getRequest(url) {
  console.log("hello from getrequest");
  $.get(url, function (data, status, xhr) {
    console.log(data);
    console.log(status);
    console.log(xhr.status);
    $("#responseTextarea").html(JSON.stringify(data,null, 2));
    $("#status").val(`PLAIN TEXT:JSON STATUS:${status}  CODE:${xhr.status}`);
  });
}

// function getRequest(url){
//   console.log("hello from getrequest");
//   let xhttp = new XMLHttpRequest();

//   xhttp.onreadystatechange = function(){
//       if(xhttp.readyState === 4 && xhttp.status ===200){
//           let response = JSON.parse(xhttp.responseText);
//           console.log(response);

//       }
//   }
//   xhttp.open("GET",url);
//   xhttp.send();

// }

//********POST*******/
function postRequest(url) {
  console.log("curent val");
  let val = $("#requestTextarea").val();
  console.log(val);
  console.log(JSON.parse(val));
  $.post(url, JSON.parse(val), function (data, status, xhr) {
    $("#responseTextarea").html(JSON.stringify(data,null, 2));
    console.log(JSON.stringify(data));
    console.log(typeof data);
    $("#status").val(`PLAIN TEXT:JSON STATUS:${status}  CODE:${xhr.status}`);
  });
}

///*******CLEAR INPUTS *****/
$("#select").change(function () {
  $("#responseTextarea").html('');
  $("#requestTextarea").html('');
  $("#status").val('');
  })