import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import * as Brevo from "@getbrevo/brevo";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});

let adminSocketId = null;
let users = {}; // { socketId: { email, messages: [], emailSent } }

// ✅ Brevo Email Setup (Replaces Nodemailer)
const brevo = new Brevo.TransactionalEmailsApi();

brevo.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

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
    console.log("user-message event fired");
    console.log("Received from frontend:", { text, email });

    if (!users[socket.id]) return;

    // Save user email first
    if (email && !users[socket.id].email) {
      users[socket.id].email = email;
    }

    // Ignore system message
    if (text === "User joined") return;

    // Save msg
    users[socket.id].messages.push({ sender: "user", text });

    // Send email only for first message after email is saved
    if (users[socket.id].email && !users[socket.id].emailSent && text) {
      try {
            console.log("Attempting to send email...");
        await brevo.sendTransacEmail({
          sender: {
            email: process.env.SENDER_EMAIL,
            name: "Portfolio Chat",
          },
          to: [
            {
              email: process.env.SENDER_EMAIL,
            },
          ],
          subject: `New Portfolio Chat from ${users[socket.id].email}`,
          htmlContent: `
            <h3>New Chat Started</h3>
            <p><b>User Email:</b> ${users[socket.id].email}</p>
            <p><b>Message:</b> ${text}</p>
          `,
        });

        users[socket.id].emailSent = true; // prevent further emails
        console.log("First question email sent successfully");
      } catch (err) {
        console.error("Error sending email:", err);
      }
    }

    // Send to admin panel if online
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

    // Send to the respective user
    io.to(userId).emit("admin-message", { sender: "admin", text });

    // Update admin panel
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