import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
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
  const selectedUserRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const originalPadding = document.body.style.paddingTop;
    document.body.style.paddingTop = "0px";
    return () => { document.body.style.paddingTop = originalPadding; };
  }, []);

  const login = () => {
    if (password !== import.meta.env.VITE_ADMIN_PASSWORD) {
      setError("Wrong password");
      return;
    }
    setError("");

    const socket = io("https://dhanush-portfolio-service.onrender.com");
    socketRef.current = socket;
    socket.emit("register-admin");

    // Listener 
    socket.off("update-user-list").on("update-user-list", (data) => {
      setUsers(data);
      const currentUserId = selectedUserRef.current;
      if (currentUserId && data[currentUserId]) {
        setMessages(data[currentUserId].messages || []);
      }
    });

    setAuthenticated(true);
  };

  const selectUser = (userId) => {
    setSelectedUser(userId);
    selectedUserRef.current = userId;
    setMessages(users[userId]?.messages || []);
    setShowSidebar(false);
  };

  const sendReply = () => {
    if (!msg.trim() || !selectedUser) return;
    const text = msg.trim();
    socketRef.current.emit("admin-reply", { userId: selectedUser, text });
    setMessages((prev) => [...prev, { sender: "admin", text }]);
    setMsg("");
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <h2>Admin Login</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Enter password"
          />
          {error && <p className="admin-error">{error}</p>}
          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <button className="menu-btn" onClick={() => setShowSidebar((prev) => !prev)}>☰</button>
        <span>Admin Panel</span>
      </div>

      <div className="admin-body">
        {showSidebar && <div className="sidebar-overlay" onClick={() => setShowSidebar(false)} />}

        <div className={`admin-sidebar ${showSidebar ? "open" : ""}`}>
          <h3>Users</h3>
          {Object.keys(users).length === 0 && <p className="no-users">No users online</p>}
          {Object.keys(users).map((id) => (
            <div
              key={id}
              className={`user-item ${selectedUser === id ? "active" : ""}`}
              onClick={() => selectUser(id)}
            >
              <span className="user-email">{users[id].email || "Online user"}</span>
              <span className="user-id"> ({id.slice(0, 5)})</span>
            </div>
          ))}
        </div>

        <div className="admin-chat">
          <h3>
            {selectedUser
              ? `Chat with: ${users[selectedUser]?.email || selectedUser.slice(0, 8)}`
              : "Select a user to chat"}
          </h3>

          <div className="messages-box">
            {!selectedUser && <p className="no-msg">Select a user from the sidebar</p>}
            {selectedUser && messages.length === 0 && <p className="no-msg">No messages yet</p>}
            {messages.map((m, i) => (
              <div key={i} className={`message ${m.sender}`}>
                <span>{m.text}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input">
            <input
              value={msg}
              disabled={!selectedUser}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendReply()}
              placeholder={selectedUser ? "Type reply..." : "Select a user first..."}
            />
            <button onClick={sendReply} disabled={!selectedUser}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}