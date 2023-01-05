const dgram = require('dgram');
const readline = require('readline');
const socket = dgram.createSocket('udp4');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.addListener('line', (line) => {
    const message = Buffer.from(`${line}\n`);
    socket.send(message, 8081, 'localhost', (err) => {
        if (err) {
            console.log(`Error sending message: ${err}`);
        } else {
            console.log('Message sent to server');
        }
    });
});

socket.on('message', (msg, rinfo) => {
    console.log(`client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

