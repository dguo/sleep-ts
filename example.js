// Build the project and then run with $ node example.js

const sleep = require('./dist').sleep;

// With async/await
(async function slowHelloWorld() {
    console.log('Hello');
    await sleep(1000);
    await sleep('2s');
    console.log('World');
})()

// With raw Promises
sleep(4000).then(() => {
    console.log('PING');
    return sleep(3000, 'PONG');
}).then(response => {
    console.log(response);
});
