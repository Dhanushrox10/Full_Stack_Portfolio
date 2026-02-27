# 🚀 Dhanush's Full Stack Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Live-brightgreen?style=for-the-badge&logo=vercel)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Socket.io](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socket.io)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)

**A modern, full stack developer portfolio with a real-time chat system, bot flow, and live admin panel.**

🌐 **[View Live →](https://dhanushdev-portfolio.vercel.app)**

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 **Real-time Chat** | Live chat between visitors and admin via WebSocket |
| 🤖 **Mochi Bot** | Smart bot flow when admin is offline |
| 🛡️ **Admin Panel** | Secure admin dashboard to chat with visitors |
| 🎇 **Particle Animation** | Interactive tsParticles background in hero section |
| ✍️ **Typed.js** | Animated typing effect for roles/titles |
| 📱 **Fully Responsive** | Optimized for all screen sizes |
| 🌓 **Smooth Animations** | Scroll-triggered slide-in animations throughout |
| 🔒 **Dev Tools Disabled** | Right-click and devtools shortcuts blocked |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Vite 6 | Build Tool |
| React Router DOM | Client-side Routing |
| Socket.io Client | Real-time Communication |
| tsParticles | Particle Animation |
| Typed.js | Typing Animation |
| Bootstrap Icons | Icon Library |
| CSS3 | Styling & Animations |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime Environment |
| Express | Web Server |
| Socket.io | WebSocket Server |
| CORS | Cross-Origin Handling |

### Hosting
| Service | Role |
|---|---|
| ▲ Vercel | Frontend Hosting |
| 🟣 Render | Backend Hosting |
| 🐙 GitHub | Version Control |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                   USER'S BROWSER                    │
│                                                     │
│   ┌─────────────────┐    ┌──────────────────────┐  │
│   │   Vercel CDN    │    │   Render WebSocket   │  │
│   │  (React App)    │◄──►│   (Socket.io Server) │  │
│   │                 │    │                      │  │
│   │ HTML / CSS / JS │    │  Real-time Events    │  │
│   └─────────────────┘    └──────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### How It Works

```
User opens Vercel URL
        ↓
React app loads in browser
        ↓
chat.jsx connects → io("Render Backend URL")
        ↓
Browser ↔ Render via WebSocket
        ↓
Real-time chat works 🚀
```

---

## 💬 Chat System Flow

```
Visitor Opens Chat
        │
        ▼
┌───────────────────┐        ┌──────────────────────┐
│   Admin OFFLINE   │        │    Admin ONLINE      │
│                   │        │                      │
│ Mochi Bot greets  │        │ Direct live chat     │
│ Collects email    │        │ with admin           │
│ Collects question │        │                      │
│  Stores in panel  │        │                      │
│ Shows bot menu    │        │                      │
└───────────────────┘        └──────────────────────┘
        │                               │
        └──────────┬────────────────────┘
                   ▼
         Admin Panel
         Shows user email + messages
         Admin can reply in real-time
```

---

## 📁 Project Structure

```
my-portfolio/
├── public/                
│   ├── mochi.png           # Bot avatar
│   ├── admin.png           # Admin avatar
│   └── favicon.ico
├── src/
│   ├── Components/
│   │   ├── navbar.jsx      # Navigation bar
│   │   ├── hero.jsx        # Hero section + TSparticles
│   │   ├── about.jsx       # About me section
│   │   ├── skills.jsx      # Skills grid
│   │   ├── education.jsx   # Education timeline
│   │   ├── projects.jsx    # Projects showcase
│   │   ├── experience.jsx  # Work experience
│   │   ├── contact.jsx     # Contact form
│   │   ├── footer.jsx      # Footer
│   │   ├── chat.jsx        # 💬 Chat widget (visitor side)
│   │   └── admin.jsx       # 🛡️ Admin panel
│   ├── Hooks/
│   │   └── useinView.js    # Scroll animation hook
│   ├── App.jsx
│   └── main.jsx
├── server/
│   └── server.js           # Node.js + Socket.io backend
├── vercel.json             # Vercel SPA routing config
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js v20+
- npm

### Frontend Setup
```bash
# Install dependencies
npm install

# Run locally
npm run dev
```

### Backend Setup
```bash
Hosted on Render — no local setup needed.
```

### Build for Production
```bash
npm run build
```

---

## 🚀 Deployment

| Part | Platform | Auto Deploy |
|---|---|---|
| Frontend | Vercel | ✅ On git push |
| Backend | Render | ✅ On git push |

---

## 📬 Contact

**Dhanush S**
- 🌐 Portfolio: [dhanushdev-portfolio.vercel.app](https://dhanushdev-portfolio.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/dhanush-s-68198b23b](https://www.linkedin.com/in/dhanush-s-68198b23b/)
- 🐙 GitHub: [github.com/Dhanushrox10](https://github.com/Dhanushrox10)
- 📧 Email: dhanushsm10@gmail.com

---

<div align="center">
  Made with ❤️ by Dhanush
</div>
