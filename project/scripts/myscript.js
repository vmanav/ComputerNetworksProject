let socket = io()

socket.on('connected', () => {
    console.log("Socket ID :", socket.id)
})

$(() => {

    // alert("LOCKED and LOADED !")

    let myId = $('#myId');
    let connectButtton = $('#connectButtton');
    let chatWindow = $('#chatWindow');
    let send = $('#send');
    let msg = $('#msg');
    let destPeerID = $('#destPeerID');
    let chatList = $('#chatList');
    let loginButton = $('#loginButton');
    let username = $('#username');
    let afterLogIn = $('#afterLogIn');
    let loginDiv = $('#loginDiv');
    let userList = $('#userList');
    let myUsername = $('#myUsername');

    // Creating a new Peer
    var peer = new Peer({
        host: location.hostname,
        port: 3000,
        path: '/p2pServer',
    });

    // var conn = peer.connect('3h75nadj32n00000')
    // conn.send('hello')

    // When a new Peer is Created
    peer.on('open', function (id) {
        console.log('My peer ID is: ' + id);
        myId.text(id)

    });

    loginButton.click(() => {

        let usernameValue = username.val();
        if (usernameValue == "") {
            alert("Please Provide a username.")
            return;
        }
        console.log("user ->", usernameValue)
        myUsername.text(usernameValue)

        loginDiv.removeClass("d-flex").addClass("d-none");
        afterLogIn.show("fast");

        // Only if a user allows!
        socket.emit('addUser', {
            username: usernameValue,
            peerId: myId.text()
        })



        socket.on('alertAllAboutNewUser', (data) => {
            console.log("Data is -->", data);
            console.log(data.list)
            refreshUserList(data.list)
        })


        peer.on('disconnected', function () {

        });

    })
    // Error Handling
    peer.on('error', function (err) {
        console.log("ERROR ->", err);
        console.log("Error Type: ", err.type);
        alert("Error Encountered : " + err.type);
    })


    // Recieving a connection
    peer.on('connection', function (connectionObject) {
        // console.log("someone tried conecteing")
        console.log("connectionObject", connectionObject)
        console.log("Peer ID: " + connectionObject.peer + " , tried Connectiong You.")


        connectionObject.on('open', function () {

            // Receive Messages
            connectionObject.on('data', function (data) {
                // console.log('Received', data);
                chatList.append(`<li>${data}</li>`);
            });

        });

    });



    // Clikcing on the Connect Button
    connectButtton.click(() => {

        destPeerIDValue = destPeerID.val();
        if (destPeerIDValue == "") {
            alert("Please Provide a PeerID.")
            return;
        }
        var conn = peer.connect(destPeerIDValue);
        if (!conn) {
            alert("Please Provide a VALID PeerID.");
            return
        }
        conn.on('open', function () {

            // Send Messages
            send.click(() => {
                let textToSend = msg.val();

                if (textToSend == "") {
                    // EMPTY MSSG BODY
                    alert("Why send an empty Message ?")
                    return
                }

                updatedTextToSend = myUsername.text() + " : " + textToSend;
                msg.val("");

                // send to other users
                conn.send(updatedTextToSend);

                // Also add at your screen
                chatList.append(`<li style="text-align: right;">${textToSend}</li>`);
            })
        });

    });



    function refreshUserList(listOfUsers) {
        userList.text("")
        listOfUsers.forEach(myFunction);
        function myFunction(item) {
            // console.log(item)
            userList.append(`<li><b>${item.username}</b> : <u><i>${item.peerId}</i></u></li>`)
        }
    }

})
