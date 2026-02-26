import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import "./chat.css";

export default function Chat() {
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const toggleRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [emailVerified, setEmailVerified] = useState(false);
  const [step, setStep] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // store email

  // Chat text formatter (detect URLs)
  const formatText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) =>
      part.match(urlRegex) ? (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {part}
        </a>
      ) : (
        part
      ),
    );
  };

  // Socket
  useEffect(() => {
    const socket = io("https://dhanush-portfolio-service.onrender.com");
    socketRef.current = socket;

    socket.emit("user-join");

    // Admin online status
    socket.on("admin-status", (status) => {
      setOnline(status);

      // Enable input if admin comes online and bot options exist
      if (status) {
        setInputDisabled(false);
      }
    });

    socket.on("admin-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, []);

  // Auto Scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(
        () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
        0,
      );
    }
  }, [open]);

  // Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!open) return;

      const clickedOutsideChat =
        chatRef.current && !chatRef.current.contains(event.target);
      const clickedToggle =
        toggleRef.current && toggleRef.current.contains(event.target);

      if (clickedOutsideChat && !clickedToggle) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Intro Texts
  useEffect(() => {
    if (open && !online && messages.length === 0) startIntro();
  }, [open, online, messages.length]);

  const addMessage = (message, delay = 0) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, message]);
      if (message.options && !online) setInputDisabled(true);
    }, delay);
  };

  const startIntro = () => {
    addMessage({ sender: "bot", text: "Hi there! I’m Mochi😊" }, 500);
    addMessage(
      {
        sender: "bot",
        text: "I’m here to help you explore Dhanush’s portfolio🚀",
      },
      1800,
    );
    addMessage({ sender: "bot", text: "What is your email address🙂?" }, 2800);
    setStep(1);
  };

  const restartChat = () => {
    setMessages([]);
    setEmailVerified(false);
    setStep(0);
    setInputDisabled(false);
    setUserEmail("");
  };

  // Bot Message
  const sendMessage = () => {
    if (!msg.trim() || inputDisabled) return;

    const text = msg;
    setMsg("");
    setMessages((prev) => [...prev, { sender: "user", text }]);

    if (online) {
      socketRef.current.emit("user-message", {
        text,
        email: emailVerified ? userEmail : "",
      });
      return;
    }

    if (!emailVerified) {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(text)) {
        addMessage({ sender: "bot", text: "Please enter a valid email." }, 500);
        return;
      }

      setEmailVerified(true);
      setUserEmail(text);
      setStep(2);

      socketRef.current.emit("user-message", {
        text: "User joined",
        email: text,
      });

      addMessage(
        { sender: "bot", text: "Superb! Now, what is your question?🤔" },
        700,
      );
      return;
    }

    if (step === 2) {
      setStep(3);
      socketRef.current.emit("user-message", { text, email: userEmail });

      addMessage(
        {
          sender: "bot",
          text: "Thanks for your question!🙌 The admin is notified and will be joining you shortly!😊",
        },
        600,
      );
      addMessage(
        {
          sender: "bot",
          text: "Meanwhile, you can explore more about me:",
          options: ["About me", "No thanks"],
        },
        1400,
      );
    }
  };

  // Options
  const handleOption = (option, index) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, optionsDisabled: true } : m)),
    );
    setInputDisabled(!online);
    setMessages((prev) => [...prev, { sender: "user", text: option }]);

    if (option === "About me") {
      addMessage(
        {
          sender: "bot",
          text: "I’m Dhanush😇, a Data Engineer and Full Stack Developer skilled in Frontend tools, Python, Node.js, React, and modern web technologies. I build responsive web applications and work on data driven and analytics based projects.🚀",
          options: ["Know more", "Contact admin"],
        },
        600,
      );
    }

    if (option === "No thanks" || option === "Contact admin") {
      addMessage(
        {
          sender: "bot",
          text: "You can contact the admin using the contact form.",
          link: "#contact",
        },
        600,
      );
    }

    if (option === "Know more") {
      addMessage(
        {
          sender: "bot",
          text: "Choose a platform:",
          options: ["LinkedIn", "GitHub", "Back"],
        },
        600,
      );
    }

    if (option === "LinkedIn") {
      addMessage(
        {
          sender: "bot",
          text: "LinkedIn:\nhttps://www.linkedin.com/in/dhanush-s-68198b23b/",
          options: ["Back to Menu"],
        },
        500,
      );
    }

    if (option === "GitHub") {
      addMessage(
        {
          sender: "bot",
          text: "GitHub:\nhttps://github.com/Dhanushrox10",
          options: ["Back to Menu"],
        },
        500,
      );
    }

    if (option === "Back") {
      addMessage(
        {
          sender: "bot",
          text: "Meanwhile, you can explore more about me:",
          options: ["About me", "No thanks"],
        },
        600,
      );
    }

    if (option === "Back to Menu") {
      addMessage(
        {
          sender: "bot",
          text: "Choose a platform:",
          options: ["LinkedIn", "GitHub", "Back"],
        },
        600,
      );
    }
  };

  return (
    <>
      <button
        ref={toggleRef}
        className="chat-toggle"
        onClick={() => setOpen(!open)}
      >
        <i className="bi bi-chat-right-text-fill"></i>
      </button>

      {open && (
        <div className="chat-container" ref={chatRef}>
          <div className="chat-header">
            <div className="header-left">
              <span className="header-title">
                {online ? "Admin Online" : "Mochi Assistant"}
              </span>
              <span className={online ? "status online" : "status offline"} />
            </div>
            <button className="restart-btn" onClick={restartChat}>
              Restart
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`message-row ${m.sender === "user" ? "right" : "left"}`}
              >
                {m.sender !== "user" && (
                  <img
                    src={m.sender === "admin" ? "/admin.png" : "/mochi.png"}
                    className="chat-avatar"
                    alt=""
                  />
                )}
                <div
                  className={`chat-bubble ${m.sender === "user" ? "bubble-user" : "bubble-bot"}`}
                >
                  {formatText(m.text)}
                  {m.options && (
                    <div className="options">
                      {m.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOption(opt, i)}
                          disabled={m.optionsDisabled}
                          className="option-btn"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  {m.link && (
                    <a href={m.link} className="link-btn">
                      Go to Contact Form
                    </a>
                  )}
                </div>
                {m.sender === "user" && (
                  <img src="/usersvg.png" className="chat-avatar" alt="" />
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="chat-input-area">
            <input
              value={msg}
              disabled={inputDisabled}
              onChange={(e) => setMsg(e.target.value)}
              placeholder={
                inputDisabled
                  ? "Select an option..."
                  : online
                    ? "Message admin..."
                    : emailVerified
                      ? "Type your message..."
                      : "Enter your email..."
              }
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} disabled={inputDisabled}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
