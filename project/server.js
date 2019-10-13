const express = require('express')
const app = express()
const ExpressPeerServer = require('peer').ExpressPeerServer;

users = [];

app.set('view engine', 'hbs');
const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log("Running on : http://localhost:3000")
})

const options = {
    debug: true
}

const peerserver = ExpressPeerServer(server, options);

app.use('/p2pServer', peerserver);

app.get('/p2p', (req, res) => {
    res.render('temp.hbs', { users })
})

peerserver.on('connection', (client) => {
    console.log("A client has been connected")
    console.log(client)
    users.push(client)
    console.log("Users Available : ", users)
    
});

