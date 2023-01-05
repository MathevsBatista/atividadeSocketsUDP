const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

const getUserInput = () => {
    return new Promise((resolve, reject) => {
        process.stdin.resume();
        process.stdin.once('data', (data) => {
            resolve(data.toString().trim());
        });
    });
};

async function sendMessage() {
    const message = await getUserInput();
    const messageBuffer = Buffer.from(`${message}`);
    socket.send(messageBuffer, client.port, client.address, (err) => {
        if (err) {
            console.log(`Error sending message: ${err}`);
        } else {
            console.log('Message sent to client');
        }
    });
}

socket.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    client = rinfo;
    sendMessage();
    hasSentMessage = false;
});

socket.bind(8081);

