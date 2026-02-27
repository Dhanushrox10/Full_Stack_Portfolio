import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const users = {};
let adminSocketId = null;

const broadcastAdminStatus = (status) => {
  for (const id in users) {
    io.to(id).emit("admin-status", status);
  }
};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("user-join", () => {
    users[socket.id] = { email: "", messages: [] };
    socket.emit("admin-status", adminSocketId !== null);
    if (adminSocketId) io.to(adminSocketId).emit("update-user-list", users);
  });

  socket.on("user-message", ({ text, email, first }) => {
    if (!users[socket.id]) users[socket.id] = { email: "", messages: [] };

    if (first && email) {
      users[socket.id].email = email;
    }

    if (!first) {
      users[socket.id].messages.push({ sender: "user", text });
    }

    if (adminSocketId) {
      io.to(adminSocketId).emit("update-user-list", users); // only this, nothing else
    }
  });

  socket.on("register-admin", () => {
    adminSocketId = socket.id;
    socket.emit("update-user-list", users);
    broadcastAdminStatus(true);
  });

  socket.on("admin-reply", ({ userId, text }) => {
    if (!users[userId]) return;
    users[userId].messages.push({ sender: "admin", text });
    io.to(userId).emit("admin-message", { sender: "admin", text });
    if (adminSocketId) io.to(adminSocketId).emit("update-user-list", users);
  });

  socket.on("disconnect", () => {
    if (socket.id === adminSocketId) {
      adminSocketId = null;
      broadcastAdminStatus(false);
    } else {
      delete users[socket.id];
      if (adminSocketId) io.to(adminSocketId).emit("update-user-list", users);
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log("Server running"));