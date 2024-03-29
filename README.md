# P2P-Chat

MULTI PURPOSE PEER-TO-PEER​​ APPLICATION

[![Website shields.io](https://img.shields.io/badge/nodeJS-server-green.svg)](https://github.com/rogers9798/P2P-Chat) 

## About 

The aim of the project is to develop a multi-purpose ​ Web application​ based on a <br> peer-to-peer architecture so that computer systems (​ Peers ​ ) are connected directly in a <br> network facilitating minimal or no dependence on any central server.


### The project mainly focuses on providing the following functionalities to the users:

* Peer-to-peer Text Chat service.
* Peer-to-peer Video Chat service.
* Peer-to-peer File Transfer service.


### The Project is divided into two parts :

* P2P Chat App (Text and Video)
* P2P File Transfer

## Prerequisites

* Nodejs should be installed in your system.
* An active command line/terminal.


## Usage 

* Clone the project by running the command `git clone https://github.com/rogers9798/P2P-Chat.git` in your terminal.
* Navigate to the project's main directory and install dependencies(node-modules) using running `npm i ` in your terminal. 

* ### For P2P Chat App (Text and Video) : 
    
    * Run `node server.js` in your command line. The application will start on localhost and port, which will be shown in console.
    * Now open your browser and enter `localhost:3000/p2pChat` , or with the port specified in the console, in the address bar. Chat Apllication Login page will be rendered now.
    * On the bottom-left side of your screen, a list of currently online users will be rendered, from which you have to copy any peerID and paste into `Peer ID to Connect With:` input field.
    * Now press `connect`, your will be connected to the peer whose ID you have enetered and can now send messages to the other peer. **Note that**, the other peer will also have to connect with you in the same manner to send text.
    * For *VideoChat*, you have to click the `Start Video Chat` button, given there is a PeerID enetered by you in the `Peer ID to Connect With:` field.
    * After a succeful connection, the connected peer will be able to see your meadia stream, and will have to repeat the same step to send its *media stream* to you.
    * *Errors* due to any issues will be reported to the clients.

* ### For P2P File Transfer :

    * Run `node server.js` in your command line. The application will start on localhost and port, which <br> will be shown in console log.
    * Now open your browser and enter `localhost:3000/p2pfileTransfer` , or with the port specified <br> in the console, in the address bar. Sender side page will be rendered now.
    * Select the file and press `Send`. A link will be generated then.
    * Open the link in new tab without closing the sender side page.
    * Receiver side page will be rendered. Press the link on receiver side and your file will be received.


## Collaborators :

* Manav Verma               : [@vmanav](https://github.com/vmanav)

* Mayur Gaur                : [@Mayurgaur](https://github.com/Mayurgaur)

* Sachin Kumar              : [@rogers9798](https://github.com/rogers9798) 

* Siddharth Aggarwal         : [@siddhu15798](https://github.com/siddhu15798)