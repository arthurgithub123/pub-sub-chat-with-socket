const net = require('net');

const chatRooms = { };

function subscribe(room, socket) { // sub_roomName
  if(!chatRooms[room]) chatRooms[room] = [];

  chatRooms[room].push(socket);
}

function publish(room, message) { // pub_roomName_message
  if(!chatRooms[room]) return;

  for(const socket of chatRooms[room]) {
    socket.write(message);
  }
}

const serverSocket = new net
  .Server()
  .listen(44332);

serverSocket.on('connection', socket => {
  socket.on('data', data => {
    const dataArray = data.toString().split('_');
    const pubOrSub  = dataArray[0];
    const room      = dataArray[1];
  
    if(pubOrSub === 'sub') {
      subscribe(room, socket);
      return;
    }
  
    if(pubOrSub === 'pub') {
      const message = dataArray[2];
      publish(room, message);
      return;
    }
  })
});

serverSocket.on('listening', () =>
  console.log('Listening on 44332')
)