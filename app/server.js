
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
/* barberId (doc.id)
   barberName (doc.data().name)
*/
firestore.collection("Barbers").get().then(function (querySnapshot) {
  console.log("List of barbers:");
  querySnapshot.forEach(function (doc) {
    // doc.data() is never undefined for query doc snapshots

    console.log(doc.id, " => ", doc.data().name);
  });
});

// get availability of the barber
/* barber's name (doc.data().name)
   barber's availability (doc.data().availability)
*/
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
/* reservationID (doc.id)
   reservationInformation (doc.data)
*/
firestore.collection("Reservations").get().then(function (querySnapshot) {
  console.log("All Reservations:");
  querySnapshot.forEach(function (doc) {
    // doc.data() is never undefined for query doc snapshots      
    console.log("ReservationID(" + doc.id + ")", " => ", doc.data());
  });
});

// get the list of services which barber provides
/* barber's name (doc.data().name)
   barber's services (doc.data().services)
*/
var docRef = firestore.collection("Barbers").doc("0sWlR1CindzQB2lp10Yk");
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

var docRef = firestore.collection("Barbers").doc("cNqgHD5XWj2TVFNTojZ0");


/*var resID = "FDAFDAFADSFASDFASD";
var slot = "1300";

firestore.runTransaction(function(transaction) {
  // This code may get re-run multiple times if there are conflicts.
  return transaction.get(docRef).then(function(doc) {
      if (!doc.exists) {
          throw "Document does not exist!";
      }
      console.log(doc.data().availability);
      var availabilityArray = doc.data().availability;
      availabilityArray.push({ reservationID: resID, slot: slot});
      transaction.update(docRef, {availability: availabilityArray});
  });
}).then(function() {
    console.log("Transaction successfully committed!");
}).catch(function(error) {
    console.log("Transaction failed: ", error);
});*/

var barberName = "John";
var clientName = "Sam";
var clientPhone = "9187867722";
var service = "trim";
var duration = "30min";
var favourite = true;
var slot = "1300";
var status = "waiting";

// add new reservation (id of the document is generated automatically)
firestore.collection("Reservations").add({
  barberName: barberName,
  clientName: clientName,
  clientPhone: clientPhone,
  service: service,
  duration: duration,
  favourite: favourite,
  slot: slot,
  status: status
})
.then(function(docRef) {
  var resID = docRef.id;
  var slot = 1300;
  var docRef = firestore.collection("Barbers").doc("cNqgHD5XWj2TVFNTojZ0");
  firestore.runTransaction(function(transaction) {
    console.log(docRef);
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(docRef).then(function(doc) {
        if (!doc.exists) {
            throw "Document does not exist!";
        }
        console.log(doc.data().availability);
        var availabilityArray = doc.data().availability;
        availabilityArray.push({ reservationID: resID, slot: slot});
        transaction.update(docRef, {availability: availabilityArray});
    });
  }).then(function() {
      console.log("Transaction successfully committed!");
  }).catch(function(error) {
      console.log("Transaction failed: ", error);
  });
  var docRef = firestore.collection("Barbers").doc("cNqgHD5XWj2TVFNTojZ0");
  firestore.runTransaction(function(transaction) {
    console.log(docRef);
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(docRef).then(function(doc) {
        if (!doc.exists) {
            throw "Document does not exist!";
        }
        console.log(doc.data().availability);
        var availabilityArray = doc.data().availability;
        availabilityArray.push({ reservationID: resID, slot: slot});
        transaction.update(docRef, {availability: availabilityArray});
    });
  }).then(function() {
      console.log("Transaction successfully committed!");
  }).catch(function(error) {
      console.log("Transaction failed: ", error);
  });

  firestore.collection("Clients").where("name", "==", clientName)
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var docRef = firestore.collection("Clients").doc(doc.id).collection("reservations").add({
        barberName: barberName,
        service: service,
        duration: duration,
        favourite: favourite
      })
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

/*firestore.collection("Clients").where("name", "==", "Anna")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      var docRef = firestore.collection("Clients").doc(doc.id).collection("reservations").add({
        barberName: "John",
        service: "trim",
        duration: "30min",
        favourite: true
      })
    });
  })
  .catch(function (error) {
    console.log("Error getting documents: ", error);
  });
*/

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


