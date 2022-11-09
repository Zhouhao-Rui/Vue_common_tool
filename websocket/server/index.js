const Ws = require('ws');

(function (Ws) {
  const WsServer = new Ws.Server({
    port: 3000
  });

  const bindEvents = () => {
    WsServer.on('connection', (ws) => {
      // get message
      ws.on('message', (message) => {
        // broadcasting
        WsServer.clients.forEach(client => {
          client.send(message.toString())
        })
      })
    })

    WsServer.on('close', () => {
      console.log('close')
    })

    WsServer.on('error', () => {
      console.log('error')
    })
  }

  const init = () => {
    bindEvents();
  }

  init();


})(Ws)