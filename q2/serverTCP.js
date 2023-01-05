const net = require('net');

const server = net.createServer((client) => {
    console.log('Client connected');

    client.on('data', (data) => {
        const input = data.toString().trim().split(' ');

        const a = parseInt(input[0], 10);
        const operator = input[1];
        const b = parseInt(input[2], 10);

        let result;

        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                result = 'Invalid operator';
        }
        client.write(result.toString());
    });

    client.on('end', () => {
      console.log('Client disconnected');
    });
});

server.listen(4000, () => {
    console.log('Server listening on port 4000');
});

