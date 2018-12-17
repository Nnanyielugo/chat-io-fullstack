import express from 'express';
import socket from 'socket.io';
import path from 'path';
import logger from 'morgan';

const app = express();

const port = 3031;

app.use(logger('dev'));

app.use(express.static('dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

app.set('port', port)

const server = app.listen(app.get('port'), () => {
  console.log(`Server started... \nListening on ${server.address().port}`);
});



export default app;

let io = socket(server);
io.on('connection', (socket) => {
  console.log(socket.id)

  socket.on('SEND_MESSAGE', function(data) {
    socket.emit('RECIEVE_MESSAGE', data)
  })
})