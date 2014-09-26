dashy
=====

Simple dashboard infrastructure written in JavaScript, running on Node.js and using and WebSockets (socket.io).

Install
=====

    npm install

Run
=====


Start the web app and the workers using [Foreman](https://github.com/ddollar/foreman):
  `foreman start`
  
Or run it manually in two different shells:
  `node --harmony app/server.js`
  `node --harmony dashy_worker.js`
  
And navigate to http://localhost:3000
