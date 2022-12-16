import userApi from "@api/userApi";
import toast from "react-hot-toast";
import userDefault from "@images/userDefault.png";
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
  console.log(socket);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

export const Post_Vote = () => {
  //   socket.emit("my message", "Hello there from React.");
  if (!socket) return true;
  socket.on("Post_Vote", (msg) => {
    console.log("Websocket Post Vote received!");
    console.log(msg);
    if (msg) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full text-primary   bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start relative">
                <p className=" text-bg font-medium text-right text-[8px] absolute top-0 -translate-y-2 translate-x-1 right-0">
                  Now
                </p>
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={msg.userSend.imageLink || userDefault}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {msg.userSend.username}
                  </p>
                  <p className="mt-1 text-sm  text-bg">{msg.body}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        { duration: 4000 }
      );
    }
  });
  socket.on("Post_Comment", (msg) => {
    console.log("Websocket Post Comment received!");
    console.log(msg);
    if (msg) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full text-primary   bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start relative">
                <p className=" text-bg font-medium text-right text-[8px] absolute top-0 -translate-y-2 translate-x-1 right-0">
                  Now
                </p>
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={msg.userSend.imageLink || userDefault}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {msg.userSend.username}
                  </p>
                  <p className="mt-1 text-sm  text-bg">{msg.body}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        { duration: 4000 }
      );
    }

    // return cb(null, msg);
  });
  socket.on("Post_Comment_Vote", (msg) => {
    console.log("Websocket Post Comment received!");
    console.log(msg);
    if (msg) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full text-primary   bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start relative">
                <p className=" text-bg font-medium text-right text-[8px] absolute top-0 -translate-y-2 translate-x-1 right-0">
                  Now
                </p>
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={msg.userSend.imageLink || userDefault}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {msg.userSend.username}
                  </p>
                  <p className="mt-1 text-sm  text-bg">{msg.body}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        { duration: 4000 }
      );
    }

    // return cb(null, msg);
  });
  socket.on("Post_Reply", (msg) => {
    console.log("Websocket Post Comment received!");
    console.log(msg);
    if (msg) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full text-primary   bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start relative">
                <p className=" text-bg font-medium text-right text-[8px] absolute top-0 -translate-y-2 translate-x-1 right-0">
                  Now
                </p>
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={msg.userSend.imageLink || userDefault}
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {msg.userSend.username}
                  </p>
                  <p className="mt-1 text-sm  text-bg">{msg.body}</p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ),
        { duration: 4000 }
      );
    }

    // return cb(null, msg);
  });
};
export const clickNotification = (id: string) => {
  if (!socket) return true;
  console.log("emit");
  socket.emit("clickNotification", id);
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
