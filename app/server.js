
import firebase from '@firebase/app';
import '@firebase/firestore';
import config from './config.js';


// Initialize Firebase
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
const firestore = firebase.firestore();

//timestamps in Cloud Firestore will be read back as Firebase Timestamp objects instead of as system Date Objects (required in the current version)
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// get list of barbers 
firestore.collection("Barbers").get().then(function (querySnapshot) {
  console.log("List of barbers:");
  querySnapshot.forEach(function (doc) {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data().name);
  });
});

// get availability of the barber
var docRef = firestore.collection("Barbers").doc("0sWlR1CindzQB2lp10Yk");
docRef.get().then(function (doc) {
  if (doc.exists) {
    console.log(doc.data().name + "'s availability:", doc.data().availability);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch(function (error) {
  console.log("Error getting document:", error);
});

// get all reservations
firestore.collection("Reservations").get().then(function (querySnapshot) {
  console.log("All Reservations:");
  querySnapshot.forEach(function (doc) {
    // doc.data() is never undefined for query doc snapshots      
    console.log("ReservationID(" + doc.id + ")", " => ", doc.data());
  });
});

// get the list of services which barber provides
var docRef = firestore.collection("Barbers").doc("0sWlR1CindzQB2lp10Yk");
// get document snapshot
docRef.get().then(function (doc) {
  if (doc.exists) {
    console.log(doc.data().name + "'s services:", doc.data().services);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}).catch(function (error) {
  console.log("Error getting document:", error);
});

//get list of reservations for selected customer
var docRef = firestore.collection("Clients").doc("BhwmcNPMA0rpxiMKGp4r").collection("reservations")
  .get().then(function (querySnapshot) {
    console.log("Customer reservations:");
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots      
      console.log("ReservationID(" + doc.id + ")", " => ", doc.data());
    });
  });


// Add new reservation into database
/*var docRef = firestore.collection("Barbers").doc("cNqgHD5XWj2TVFNTojZ0");
var barberName = "John";
var clientName = "Ivan";
var clientPhone = "9187867722";
var service = "trim";
var duration = "30min";
var favourite = true;
var slot = "1300";
var status = "waiting";


firestore.collection("Reservations").add({
    barberName: barberName,
    clientName: clientName,
    clientPhone: clientPhone,
    service: service,
    duration: duration,
    favourite: favourite,
    slot: slot,
    status: status
}).then(function(docRef) {
    var resID = docRef.id;
    var slot = 1300;
    var availability = {};
    availability[resID] = slot;

    firestore.collection("Barbers").doc("cNqgHD5XWj2TVFNTojZ0").set({
        availability
      }, { merge: true }).then(function() {
        firestore.collection("Clients").where("name", "==", clientName).get().then(function (querySnapshot) {
            if (querySnapshot.size > 0){
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(resID);
                    var docRef = firestore.collection("Clients").doc(doc.id).collection("reservations").doc(resID).set({
                        barberName: barberName,
                        service: service,
                        duration: duration,
                        favourite: favourite
                    })
                });
            } else {
                console.log('no documents found');
            }
        });
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});*/

/*
// delete reservation from the database
var clientName = "Ivan";
var resID = "10D4GkyOqQMhsBuvrzb1";

firestore.collection("Reservations").doc(resID).delete().then(function() {
    console.log("Document successfully deleted!");
    var reserField = "availability." + resID;
    console.log(reserField);
    firestore.collection("Barbers").where("availability.10D4GkyOqQMhsBuvrzb1", "==", 1300).get().then(function (querySnapshot) {
        if (querySnapshot.size > 0){
            querySnapshot.forEach(function (doc) {
                console.log(doc);
                // doc.data() is never undefined for query doc snapshots      
                var barberRef = firestore.collection('Barbers').doc(doc.id);

                var removeReservationID = barberRef.update({
                    "availability.10D4GkyOqQMhsBuvrzb1" : firebase.firestore.FieldValue.delete()
                });                
              });
        } else {
            console.log('no documents found');
        }
        firestore.collection("Clients").where("name", "==", clientName).get().then(function (querySnapshot) {
            if (querySnapshot.size > 0){
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(resID);
                    firestore.collection("Clients").doc(doc.id).collection("reservations").doc(resID).delete().then(function(){
                        console.log("Document successfully deleted!");
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                });
            } else {
                console.log('no documents found');
            }
        });  
    });
}).catch(function(error) {
    console.error("Error removing document: ", error);
});*/

/*
// delete reservation spot from the barber
firestore.collection("Barbers").where("availability.10D4GkyOqQMhsBuvrzb1", "==", 1300).get().then(function (querySnapshot) {
    if (querySnapshot.size > 0){
        querySnapshot.forEach(function (doc) {
            console.log(doc);
            // doc.data() is never undefined for query doc snapshots      
            var barberRef = firestore.collection('Barbers').doc(doc.id);

            var removeReservationID = barberRef.update({
                "availability.10D4GkyOqQMhsBuvrzb1" : firebase.firestore.FieldValue.delete()
            });                
          });
    } else {
        console.log('no documents found');
    }
});*/

// check if barber is available that time
/*firestore.collection("Barbers").where("availability.10D4GkyOqQMhsBuvrzb1", "==", 1300).get().then(function (querySnapshot) {
    if (querySnapshot.size > 0){
        console.log(querySnapshot);
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots      
            console.log("ReservationID(" + doc.id + ")", " => ", doc.data());
          });
    } else {
        console.log('no documents found');
    }
  });*/

  //add field to the object
  /*var resID = "cNqgHD5XWj2TVFNToj111";
  var slot = 1300;
  var availability = {};
  availability[resID] = slot;
  var docRef = firestore.collection("Barbers").doc("cNqgHD5XWj2TVFNTojZ0").set({
    availability
  }, { merge: true });*/





































/*exports.getAllTodos = function (req, res) {
  getTodos().
      then((todos) => {
          console.log("All Todos " + todos) // All Todos with its todo_items sub collection.
          return res.json(todos);
      })
      .catch((err) => {
          console.log('Error getting documents', err);
          return res.status(500).json({ message: "Error getting the all Todos" + err });
      });
}

function getTodos(){
  var todosRef = db.collection('todos');

  return todosRef.get()
      .then((snapshot) => {
          let todos = [];
          return Promise.all(
              snapshot.docs.map(doc => {  
                      let todo = {};                
                      todo.id = doc.id;
                      todo.todo = doc.data(); // will have 'todo.title'
                      var todoItemsPromise = getTodoItemsById(todo.id);
                      return todoItemsPromise.then((todoItems) => {                    
                              todo.todo_items = todoItems;
                              todos.push(todo);         
                              return todos;                  
                          }) 
              })
          )
          .then(todos => {
              return todos.length > 0 ? todos[todos.length - 1] : [];
          })

      })
}


function getTodoItemsById(id){
  var todoItemsRef = db.collection('todos').doc(id).collection('todo_items');
  let todo_items = [];
  return todoItemsRef.get()
      .then(snapshot => {
          snapshot.forEach(item => {
              let todo_item = {};
              todo_item.id = item.id;
              todo_item.todo_item = item.data(); // will have 'todo_item.title' and 'todo_item.completed'             
              todo_items.push(todo_item);
          })
          return todo_items;
      })
}
*/


