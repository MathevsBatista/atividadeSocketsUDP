const dgram = require('dgram');
const readline = require('readline');
const client = dgram.createSocket('udp4');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

client.on('message', (msg, rinfo) => {
    console.log(`Result: ${msg.toString()}`);
});

client.bind(() => {
    console.log('Connected to server');
    console.log('Use the form integer, space, operator, space and integer.')
    console.log('Enter two integers and an operator (+, -, *, /):');

    rl.addListener('line', (line) => {
        client.send(line, 0, line.length, 4000, 'localhost', (err) => {
            if (err) {
              console.log(err);
            }
        });
    });
});

client.on('error', (err) => {
    console.log(`Error: ${err}`);
});

