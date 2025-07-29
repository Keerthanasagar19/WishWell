# 🎁 WishWell

**WishWell** is a web platform that connects people in need with kind-hearted donors. Individuals or NGOs can submit wishes (like food, education, or medical help), and donors or volunteers can view and fulfill them.

---

## 🌟 Current Features

- 📝 Submit wishes on behalf of individuals or NGOs
- 🔍 Search and filter wishes by name, location, or category
- ✅ Mark wishes as fulfilled
- 🙏 Thank-you messages from beneficiaries
- 👩‍💼 Admin panel to manage and track all wishes
- 📊 Analytics dashboard using Chart.js (fulfilled vs pending, top volunteers)

---

## 🔜 Planned Features

- 🏆 Top donor/NGO wall
- 🌐 Multilingual support
- 📱 Mobile-responsive design
- 📧 Email notifications (via EmailJS) on wish submission and fulfillment

---

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase Firestore
- **Charts & Analytics:** Chart.js
- **Deployment (optional):** Firebase Hosting

---

## 📂 Project Structure

WishWell/
├── css/
│ ├── style.css
│ └── admin.css
├── js/
│ ├── script.js
│ ├── view-wishes.js
│ ├── admin.js
│ ├── admin-analytics.js
│ ├── ngo-submit.js
│ └── thankyou.js
├── index.html
├── home.html
├── login.html
├── submit-wish.html
├── view-wishes.html
├── wishes.html
├── admin.html
├── how-it-works.html
├── ngo-submit.html
└── README.md


---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Keerthanasagar19/WishWell.git
   cd WishWell

2. Open the project folder in a browser or Live Server
Use the Live Server extension in VS Code.
Open index.html to start using the app.

3. (Optional) Connect Firebase
Replace the placeholder Firebase config in firebase-config.js with your own Firebase project's credentials.

4. (Optional) Set up EmailJS
nd Add your EmailJS keys and template IDs in the related script file if you implement email notifications.



