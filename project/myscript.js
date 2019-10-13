$(() => {

    let myId = $('#myId');
    let connectButtton = $('#connectButtton');
    let chatWindow = $('#chatWindow');
    let destPeerID = $('#destPeerID')

    var peer = new Peer({
        host: location.hostname,
        port: 3000,
        path: '/p2pServer'
    });

    // var conn = peer.connect('3h75nadj32n00000')
    // conn.send('hello')

    peer.on('open', function (id) {
        console.log('My peer ID is: ' + id);
        myId.text(id)
    });

    // Recieving
    peer.on('connection', (conn) => {
        console.log("someone tried conecteing")
        console.log(conn)
    });

    connectButtton.click(() => {

        destPeerIDValue = destPeerID.val();
        // console.log(destPeerIDValue)
        var conn = peer.connect(destPeerIDValue);

        conn.on('open', () => {
            conn.send('hi!');
        });
    })

})