import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import PopUpNotify from "@components/PopUpNotify";
import { iNotify } from "@DTO/Notify";
let socket: Socket;
export const initiateSocketConnection = (token: string) => {
  socket = io(process.env.REACT_APP_SOCKET_URL || "ws://localhost:3000", {
    transports: ["websocket"],
    auth: {
      token: `Bearer ${token}`,
    },
  });
  `Connecting socket...`;
  process.env.REACT_APP_SOCKET_URL, socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const SocketOn = () => {
  if (!socket) return true;
  socket.on("Post_Vote", (msg: iNotify) => {
    if (msg) {
      toast.custom(
        (t) => (
          <PopUpNotify
            {...msg}
            idToast={t.id}
            visible={t.visible}
            dismiss={toast.dismiss}
          />
        ),
        { duration: 4000 }
      );
    }
  });
  socket.on("Post_Comment", (msg: iNotify) => {
    if (msg) {
      toast.custom(
        (t) => (
          <PopUpNotify
            {...msg}
            idToast={t.id}
            visible={t.visible}
            dismiss={toast.dismiss}
          />
        ),
        { duration: 4000 }
      );
    }
  });
  socket.on("Post_Comment_Vote", (msg: iNotify) => {
    if (msg) {
      toast.custom(
        (t) => (
          <PopUpNotify
            {...msg}
            idToast={t.id}
            visible={t.visible}
            dismiss={toast.dismiss}
          />
        ),
        { duration: 4000 }
      );
    }
  });
  socket.on("Post_Reply", (msg: iNotify) => {
    if (msg) {
      toast.custom(
        (t) => (
          <PopUpNotify
            {...msg}
            idToast={t.id}
            visible={t.visible}
            dismiss={toast.dismiss}
          />
        ),
        { duration: 4000 }
      );
    }
  });
};
export const clickNotification = (id: string) => {
  if (!socket) return true;
  socket.emit("clickNotification", id);
};
