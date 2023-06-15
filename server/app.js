// Імпортуємо з socket.io його функцію Server
const { Server } = require('socket.io');

// socket.io вимагає створення свого web-socket серверу на основі http. Тобто треба створити свій http-server. Але використовувати для цього пакет express немає сенсу, бо нам не потрібні ніякі роути. Нам потрібен чистий http-server
// Тому простіше імпортувати ф-ю createServer з вбудованого у JS пакету http. Для створення роуту він не підходить, але тут як раз те, що треба.
const { createServer } = require('http');

// Тепер створюємо пустий http-server:
const httpServer = createServer();

// Тепер можемо створити io-web-socket server (зазвичай називають просто io):
// підключити io web-socket server на основі httpServer
const ioWebSocketServer = new Server(httpServer, {
  cors: { origin: '*' }, // дозволяє підключення з інших портів (тому що в нас фронтенд буде пов'язаний з бекендом)
});

// Так само, як і у ws-пакеті підключаємо слухача:
ioWebSocketServer.on('connection', socket => {
  console.log('New frontend connected');

  // Ловлю повідомлення від фронтенду
  socket.on('chat-message', message => {
    // broadcast відправляє повідомлення всім, крім себе:
    socket.broadcast.emit('chat-message', message);
    // Тепер щоби фронтенд зловив цю розсилку в ньому тре повісити слухач подій
  });
});

// Але через те, що використовуємо http-сервер, то треба його запустити:
httpServer.listen(3001);
