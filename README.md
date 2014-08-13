dashy
=====

Simple dashboard system written in JavaScript using ØMQ and WebSockets (socket.io).

Install
=====

`brew install zeromq`
`npm install`

Run
=====

1. Start the web app
`node --harmony dashy_frontend.js`
2. Start the workers
`node --harmony dashy_worker.js`
`node --harmony dashy_worker2.js`
3. Navigate to http://localhost:3000
