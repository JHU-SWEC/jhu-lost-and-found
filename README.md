# 🐦 JHU Lost & Found

A community-driven platform for Johns Hopkins students to **report, search, and claim lost items** on campus.  
Built by Hopkins students to make finding your stuff a little easier.

---

## 🚀 Overview

The **JHU Lost & Found** website helps students and staff:  
- 📍 **Post** items they’ve found around campus  
- 🔍 **Search** for lost belongings using filters (location, item type, date, etc.)  
- 💬 **Connect** securely with the finder or owner  

Our goal is to make campus life less stressful — and keep your keys, IDs, and laptops from vanishing forever.

---

## 🏁 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/JHU-SWEC/jhu-lost-and-found.git
cd jhu-lost-and-found

# 2. Frontend setup
cd frontend
npm install
npm run dev

# 3. Backend setup
cd ../backend
npm install
# Create .env file with your MongoDB URI and PORT
touch .env
# Example contents:
# MONGO_URI=your_mongodb_connection_string
# PORT=5000
npm run dev