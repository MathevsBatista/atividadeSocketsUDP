const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    const [a, operator, b] = msg.toString().trim().split(' ');

    const intA = parseInt(a);
    const intB = parseInt(b);

    let result;

    switch (operator) {
        case '+':
            result = intA + intB;
            break;
        case '-':
            result = intA - intB;
            break;
        case '*':
            result = intA * intB;
            break;
        case '/':
            result = intA / intB;
            break;
        default:
            result = 'Invalid operator';
    }

    server.send(result.toString(), rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.log(err);
        }
    });
});

server.bind(4000);

