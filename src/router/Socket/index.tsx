import { io, Socket } from "socket.io-client";
let socket: Socket;
export const initiateSocketConnection = (token: string) => {
  socket = io(process.env.REACT_APP_SOCKET_URL || "ws://localhost:3000", {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
  });
  console.log(`Connecting socket...`);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const Post_Vote = () => {
  //   socket.emit("my message", "Hello there from React.");
  if (!socket) return true;
  socket.on("Post_Vote", (msg) => {
    console.log("Websocket event received!");
    console.log(msg);
    // return cb(null, msg);
  });
};

// // Handle message receive event
// export const subscribeToMessages = (cb) => {
//   if (!socket) return true;
//   socket.on("message", (msg) => {
//     console.log("Room event received!");
//     return cb(null, msg);
//   });
// };

// export const joinRoom = (roomName) => {
//   socket.emit("join", roomName);
// };

// export const sendMessage = ({ message, roomName }, cb) => {
//   if (socket) socket.emit("message", { message, roomName }, cb);
// };
