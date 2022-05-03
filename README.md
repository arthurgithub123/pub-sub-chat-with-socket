# pub-sub-chat-with-socket

###### Nodejs application using Sockets for
###### implementing Publish Subscribe Pattern
#
### Running the application
###### open a terminal and start the socket server with

```node socketChatServer.js```

###### open 2 new terminal for client a and b
#
###### client a (creator of room a)
```node```
```const net = require('net');```
```const roomAsocket = new net.Socket().connect(44332);```
```
roomAsocket.on('connect', () =>
  console.log('roomAsocket Connected to 44332')
);
```
```
roomAsocket.on('data', data =>
  console.log('roomAsocket received: ', data.toString())
);
```

###### client b
```node```
```const net = require('net');```
```const clientBsocket = new net.Socket().connect(44332);```
```
clientBsocket.on('connect', () =>
  console.log('clientBsocket Connected to 44332')
);
```
```
clientBsocket.on('data', data =>
  console.log('clientBsocket received: ', data.toString())
);
```

###### now client a and b must listen to socket on 44332
#
```
// rooma does not exist yet so it will be created
roomAsocket.write('sub_rooma');
```

```clientBsocket.write('sub_rooma');```

###### send a message from client a and b and see their logs
```roomAsocket.write('pub_rooma_hello from roomAsocket');```
```clientBsocket.write('pub_rooma_hello from clientBsocket');```
