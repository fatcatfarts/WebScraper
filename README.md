# 🕸️ WebScraper

**WebScraper** is a lightweight and user-friendly website scraping tool that lets you extract content from any public webpage using specific HTML tags. With secure login, history saving, and support for multiple tag types, it's perfect for both casual users and developers.

🔗 **Live Website**: [https://your-webscraper-site.com](https://your-webscraper-site.com)  
*(Replace with your actual live site URL)*

---

## ✨ Features

- 🔐 **Login System** – Secure authentication to access your personal scrape data.
- 🏷️ **Choose Tags** – Select from a variety of tags: `BODY`, `HEADING`, `LINK`, `PARAGRAPH`, `ARTICLE`, `LIST`.
- 💾 **Save Scrapes** – Automatically saves your scraping history with timestamps.
- 📄 **View Past Scrapes** – Easily view your saved scrape sessions anytime.
- ⚙️ **Simple UI** – Clean interface built with EJS and Bootstrap.
- ⚡ **Fast Scraping** – Powered by Cheerio and Node.js for efficient content extraction.

---

## 🛠️ Getting Started

### 📦 Clone the Repository

```bash
git clone https://github.com/fatcatfarts/WebsSraper.git
cd webscraper
📁 Install Dependencies
bash
npm install
⚙️ Setup Environment Variables
Create a .env file in the root directory and set the required variables:

env
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
PORT=3000
Replace the values with your actual MongoDB URI and secret key.

▶️ Start the Server
bash
npm start
Visit: http://localhost:3000

🧪 Example Use Case
Log in to your account.

Enter a website URL.

Choose which tags to scrape (e.g., <p>, <a>, <article>).

Hit scrape – view and save the extracted data.

Go to Saved Scrapes to view your history.

🧰 Tech Stack
Frontend: EJS, Bootstrap

Backend: Node.js, Express

Scraping Engine: Cheerio

Database: MongoDB with Mongoose

Auth: JWT & Cookies

📬 Contact
Have questions, suggestions, or bugs to report?
Open an issue or email us at agrimbhanot09@email.com

