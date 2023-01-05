const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new net.Socket();

client.connect(4000, '127.0.0.1', () => {
    console.log('Connected to server');
    console.log('Use the form integer, space, operator, space and integer.')
    console.log('Enter two integers and an operator (+, -, *, /):');

    rl.addListener('line', (line) => {
        client.write(line);
    });
});

client.on('data', (data) => {
    console.log(`Result: ${data.toString()}`);
});

client.on('end', () => {
    console.log('Disconnected from server');
});

