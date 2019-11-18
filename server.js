const express = require('express');
const app = express();
const ExpressPeerServer = require('peer').ExpressPeerServer;
const http = require('http');
const socket = require('socket.io');

listOfUsers = [];

// configuring Handlebars
app.set('view engine', 'hbs');

// Congfiguring port on heroku
const PORT = process.env.PORT || 3000;


const server = http.createServer(app)

// configuring server for socket.IO
const io = socket(server)

server.listen(PORT, () => {
    // console.log("Running on : http://localhost:3000")
    console.log("p2pChat Running on : http://localhost:3000/p2pChat")
})

const options = {
    debug: true
}

const peerserver = ExpressPeerServer(server, options);

app.use('/', express.static(__dirname + '/scripts'))

app.use('/p2pServer', peerserver);

app.get('/p2p', (req, res) => {
    res.render('temp.hbs', { users })
})

app.get('/p2pChat', (req, res) => {
    res.render('index');
})

peerserver.on('connection', (client) => {
    console.log("Client connected : ", client)
    // users.push(client)
    // console.log("Users Available : ", users)
});


// Old Code ->


// io.on('connection', (socket) => {
//     console.log("Connection Established :", socket.id)

//     // console.log("Type of socket.id -->", typeof(socket.id)) <= string
//     // When the connection is made succesfully
//     socket.emit('connected')

//     socket.on('addUser', (data) => {
//         console.log(data)
//         let obj = {
//             username: data.username,
//             peerId: data.peerId
//         }
//         console.log("Object at serevr ->", obj)
//         listOfUsers.push(obj)
//         // usersockets[data.user] = socket.id
//         // // console.log(typeof (usersockets));   console.log(usersockets)


//         io.emit('alertAllAboutNewUser', {
//             list: listOfUsers
//         })
//     })

//     socket.on('disconnect', (reason) => {
//         let username = null;
//         console.log('user disconnected, socketID : ', socket.id);

//         io.emit('jaRhahu', {
//             disconnect: true
//         })

//     });

// })


// New Code from Peerchat Application ->


io.on('connection', (socket) => {
    console.log("Connection Established :", socket.id)

    // console.log("Type of socket.id -->", typeof(socket.id)) <= string
    // When the connection is made succesfully
    socket.emit('connected')

    socket.on('addUser', (data) => {
        console.log(data)
        let obj = {
            username: data.username,
            peerId: data.peerId,
            socketId: socket.id     // added sccket.id field in a listOfUsers object.
        }
        console.log("Object at serevr ->", obj)
        listOfUsers.push(obj)
        // usersockets[data.user] = socket.id
        // // console.log(typeof (usersockets));   console.log(usersockets)


        io.emit('alertAllAboutNewUser', {
            list: listOfUsers
        })
    })


    // When a scket/ Peer is being disconnected
    socket.on('disconnect', (reason) => {
        console.log('user disconnected, socketID : ', socket.id);

        // joGyaUskiId = socket.id;

        listOfUsers = listOfUsers.filter(obj => obj.socketId == socket.id)
        console.log(listOfUsers)

        //    remove user from listOfUsers and the emit alert all
        io.emit('alertAllAboutNewUser', {
            list: listOfUsers
        })

    });

})
