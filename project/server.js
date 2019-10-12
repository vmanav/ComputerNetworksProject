const express = require('express')
const app = express()
const ExpressPeerServer = require('peer').ExpressPeerServer;

const PORT = 3000;
const server = app.listen(PORT, () => {
    console.log("Running on : http://localhost:3000")
})

const options = {
    debug: true
}

const peerserver = ExpressPeerServer(server, options);

app.use('/p2p', peerserver);
