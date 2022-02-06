function addUser() {
    user_name = document.getElementById("user_name").value;

    localStorage.setItem("user_name" , user_name);

      window.location = "kwitter_room.html";
}

const firebaseConfig = {
  apiKey: "AIzaSyDxLHIZc0LmJqvqqFDdLRdCLaWwUKOdCiI",
  authDomain: "pratham-9d745.firebaseapp.com",
  databaseURL: "https://pratham-9d745-default-rtdb.firebaseio.com",
  projectId: "pratham-9d745",
  storageBucket: "pratham-9d745.appspot.com",
  messagingSenderId: "757540262262",
  appId: "1:757540262262:web:c7e9ca15e5f08558ba2a57",
  measurementId: "G-8J6BX7WZN6"
};


 firebase.initializeApp(firebaseConfig);

function addRoom()
{
   room_name = document.getElementById("room_name").value;

   firebase.database().ref("/").child(room_name).update({
         purpose : "adding room name"
   });

   localStorage.setItem("room_name", room_name);

   window.location = "kwitter_page.html";
   
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
  Room_names = childKey;
  console.log("Room Name - " + Room_names);
  row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
  document.getElementById("output").innerHTML += row;


});});}


getData();

function redirectToRoomName(name)
{
   console.log(name);
   localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html"
}
function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
             like:0
      });
document.getElementById("msg").value = "";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];
name_with_tag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

row = name_with_tag + message_with_tag +like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("kwitter.html");
}