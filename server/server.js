import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import SibApiV3Sdk from "@sendinblue/client";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// -----------------------
// Brevo API setup
const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const brevoApi = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmail(to, subject, htmlContent) {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail({
      to: [{ email: to }],
      sender: { email: process.env.BREVO_USER },
      subject,
      htmlContent,
    });
    await brevoApi.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent to ${to} ✔️`);
  } catch (err) {
    console.error("Brevo API email error:", err);
  }
}

// -----------------------
// Users & Admin
let adminSocketId = null;
let users = {}; // { socketId: { email, messages, emailSent } }

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

    if (email && !users[socket.id].email) users[socket.id].email = email;
    if (text === "User joined") return;

    users[socket.id].messages.push({ sender: "user", text });

    // Send email only for first message
    if (users[socket.id].email && !users[socket.id].emailSent && text) {
      await sendEmail(
        process.env.BREVO_USER, // You receive email here
        `New Portfolio Chat from ${users[socket.id].email}`,
        `
          <h3>New Chat Started</h3>
          <p><b>User Email:</b> ${users[socket.id].email}</p>
          <p><b>Message:</b> ${text}</p>
        `
      );
      users[socket.id].emailSent = true;
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