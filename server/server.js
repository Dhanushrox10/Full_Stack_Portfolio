import express from "express";
import http from "http";
import { Server } from "socket.io";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// -----------------------
// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});

// -----------------------
// Users and Admins
let adminSocketId = null;
let users = {}; // { socketId: { email, messages: [], emailSent } }

// -----------------------
// Nodemailer (Gmail + App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address
    pass: process.env.GMAIL_APP_PASS, // App Password
  },
  tls: { rejectUnauthorized: false },
});

// Optional: verify SMTP connection
transporter.verify((err, success) => {
  if (err) console.log("SMTP connection failed:", err);
  else console.log("SMTP server ready ✔️");
});

// -----------------------
// Socket.io logic
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User Join
  socket.on("user-join", () => {
    users[socket.id] = { email: "", messages: [], emailSent: false };
    socket.emit("admin-status", adminSocketId !== null);
    io.emit("update-user-list", users);
  });

  // Admin Join
  socket.on("register-admin", () => {
    adminSocketId = socket.id;
    io.emit("admin-status", true);
  });

  // User Message
  socket.on("user-message", async ({ text, email }) => {
    console.log("user-message event fired:", { text, email });
    if (!users[socket.id]) return;

    // Save user email
    if (email && !users[socket.id].email) users[socket.id].email = email;

    if (text === "User joined") return; // skip system msg

    users[socket.id].messages.push({ sender: "user", text });

    // Send email only for first message
    if (users[socket.id].email && !users[socket.id].emailSent && text) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: process.env.GMAIL_USER, // where you want notifications
          subject: `New Portfolio Chat from ${users[socket.id].email}`,
          html: `
            <h3>New Chat Started</h3>
            <p><b>User Email:</b> ${users[socket.id].email}</p>
            <p><b>Message:</b> ${text}</p>
          `,
        });
        users[socket.id].emailSent = true;
        console.log("Email sent successfully ✔️");
      } catch (err) {
        console.error("Error sending email:", err);
      }
    }

    // Send message to admin if online
    if (adminSocketId) {
      io.to(adminSocketId).emit("new-message", {
        userId: socket.id,
        message: { sender: "user", text, email: users[socket.id].email },
      });
    }

    io.emit("update-user-list", users);
  });

  // Admin Reply
  socket.on("admin-reply", ({ userId, text }) => {
    if (!users[userId]) return;

    users[userId].messages.push({ sender: "admin", text });
    io.to(userId).emit("admin-message", { sender: "admin", text });

    if (adminSocketId) {
      io.to(adminSocketId).emit("new-message", {
        userId,
        message: { sender: "admin", text },
      });
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    if (socket.id === adminSocketId) {
      adminSocketId = null;
      io.emit("admin-status", false);
    }
    delete users[socket.id];
    io.emit("update-user-list", users);
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));