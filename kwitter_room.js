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