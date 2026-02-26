import { useState, useRef } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import "./admin.css";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const socketRef = useRef(null);
  const [error, setError] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const originalPadding = document.body.style.paddingTop;
    document.body.style.paddingTop = "0px";

    return () => {
      document.body.style.paddingTop = originalPadding;
    };
  }, []);

  const login = () => {
    if (password !== "nammadhan") {
      setError("Wrong password");
      return;
    }

    setError("");

    const socket = io("https://dhanush-portfolio-service.onrender.com");
    socketRef.current = socket;

    socket.emit("register-admin");

    socket.on("update-user-list", (data) => {
      setUsers(data);
    });

    socket.on("new-message", ({ userId, message }) => {
      if (userId === selectedUser) {
        setMessages((prev) => [...prev, message]);
      }
    });

    setAuthenticated(true);
  };

  const selectUser = (userId) => {
    setSelectedUser(userId);
    setMessages(users[userId]?.messages || []);
  };

  const sendReply = () => {
    if (!msg.trim() || !selectedUser) return;

    socketRef.current.emit("admin-reply", {
      userId: selectedUser,
      text: msg,
    });

    setMessages((prev) => [...prev, { sender: "admin", text: msg }]);
    setMsg("");
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h2>Admin Login</h2>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") login();
            }}
          />
          {error && <p className="admin-error">{error}</p>}
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-page">
        <div className="admin-header">
          <button
            className="menu-btn"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            ☰
          </button>
          <span>Admin Panel</span>
        </div>

        <div className="admin-body">
          {showSidebar && (
            <div
              className="sidebar-overlay"
              onClick={() => setShowSidebar(false)}
            />
          )}

          <div className={`admin-sidebar ${showSidebar ? "open" : ""}`}>
            <h3>Users</h3>
            {Object.keys(users).map((id) => (
              <div
                key={id}
                className={`user-item ${selectedUser === id ? "active" : ""}`}
                onClick={() => {
                  selectUser(id);
                  setShowSidebar(false);
                }}
              >
                {users[id].email || "Online user"} ({id.slice(0, 5)})
              </div>
            ))}
          </div>

          <div className="admin-chat">
            <h3>Chat</h3>

            <div className="messages-box">
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.sender}`}>
                  <span>{m.text}</span>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendReply()}
              />
              <button onClick={sendReply}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
