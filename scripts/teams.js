function createTeam() {
    firebase.auth().onAuthStateChanged(user => {
            if (user) {
                var currentUser = db.collection("users").doc(user.uid)
                var userID = user.uid;
                //get the document for current user.
                currentUser.get()

                var teamID = db.collection("team");
                // Team successfully created.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.

                //write to firestore with a new ID
                // {teamMembers:currentUser} add inside add() if we want to add user info to team on click
                teamID.add({
                    teamMembers: [userID] // TO DO: Need to add team creator's UID here
                }).then(function () {
                    console.log("New team added to firestore");
                    window.location.assign("invite.html"); //re-direct to invite.html after signup
                }).catch(function (error) {
                        console.log("Error adding new team: " + error);
                    })

                // add teamID to user
                db.collection("users").doc("teamMembers").appendchild(userID)   

                } else {
                    console.log("Please log in"); // No user is signed in.
                    window.location.href = "index.html";
                }
            })


    }

    // TO DO:Need to be able to pull team from local memory from createteam.html and if unavailable, pull a team based on the userID 

    // function displayTeam() {
    //     db.collection("team").get()        //name of the collection and documents should matach excatly with what you have in Firestore
    //       .onSnapshot(docID => {                                                               //arrow notation
    //            console.log("current document data: " + doc.data());                          //.data() returns data object
    //            document.getElementById("quote-goes-here").innerHTML = team.data().TeamMembers;      //using javascript to display the data on the right place

    //            //Here are other ways to access key:value data fields
    //            //$('#quote-goes-here').text(c.data().quote);                                       //using jquery object dot notation
    //            //$("#quote-goes-here").text(c.data()["quote"]);                                    //using json object indexing
    //       })
    // }
    // displayTeam();        //calling the function

    function joinTeam() {

        firebase.auth().onAuthStateChanged(user => {
            // Check if user is signed in:
            if (user) {
                // Do something for the current logged-in user here: 
                // var currentUser = db.collection("users").doc(user.uid)
                // currentUser.get()
            
                //teamID and userID are put into variables
                var currentUser = user.uid;
                console.log(currentUser);

                db.collection("team").get()
                    .then(snap => {
                        snap.forEach(doc => {
                            // var teamID = document.data().key(); 
                            var teamID = doc.id;
                            var joinID = document.getElementById("jointeam").innerText;
                            // var teamUID = db.collection("team").key;

                            if (joinID == teamID){
                                db.collection("team").doc("teamMembers").appendChild(currentUser);
                             
                                
                            console.log(doc.id);
                            }
                        })

                    })
            } else {
                console.log("Please log in to join a team");
            }
        })
    }

    // var team_Name = teamDoc.data().teamMembers;
    // console.log(team_Name);
    // //method #1:  insert with html only
    // document.add().getElementById("jointeam").innerText  //using javascript

    // //add userID to end of teamMembers array in the document with value teamID
    // db.collection("team").doc(teamID).appendchild({

    // db.collection("team").doc(team.uid).add({
    //     teamMembers: userID
    // })