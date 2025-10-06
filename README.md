# Cinemoo: Content-Based Movie Recommendation System

**Cinemoo** is a content-based movie recommendation system built with AngularTS, providing a modern web interface and a powerful backend for intelligent movie suggestions. The project leverages Angular for the frontend, `json-server` for simulating a REST API for running the recommendation engine.

---

## 🚀 Features

- **Content-Based Filtering:** Recommends movies similar to those you've liked based on metadata.
- **Modern Web UI:** Built with Angular for a responsive and interactive experience.
- **Easy to Extend:** Add more data or features with minimal effort.

---

## 🛠️ Tech Stack

- **Frontend:** Angular (TypeScript, HTML, CSS)
- **Backend Simulation:** [json-server](https://github.com/typicode/json-server) for a mock REST API using `db.json`
- **Communication:** Frontend calls REST APIs and triggers Python backend for recommendations

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/janvi0303/Cinemoo.git
cd Cinemoo
```

### 2. Set up the Angular Project

#### Install Angular CLI globally (if not already):

```bash
npm install -g @angular/cli
```

#### Install dependencies:

```bash
npm install
npm audit fix
```

#### Install and start json-server:

```bash
npm install -g json-server
json-server --watch db.json
```

_This simulates a backend with your movie data in `db.json`._

#### Start the Angular development server (in a new terminal):

```bash
ng serve
```

### 3. Add New Components (optional)

To generate a new component:
```bash
ng g c component_name
```

---

## 📝 Project Structure

- `src/` — Angular frontend source code
- `db.json` — Movie dataset for json-server (REST mock)

---

## 🧠 How It Works

1. User interacts with the Angular UI.
2. Angular fetches movie data from `json-server` (using `db.json`).
3. When the user clicks the recommendation button, Angular processes the data locally and displays similar movies in the UI.


<p align="center">
  <img src="contentbased.gif" alt="Content Based Recommendation GIF" width="400" height="400" style="border: 4px solid #4CAF50; border-radius: 10px;"/>
</p>

---

## 🧑‍💻 Contributing

Pull requests and suggestions are welcome! Please open an issue to discuss your ideas or report bugs.

---

## 🔗 Useful Commands

- **Install Angular CLI:** `npm install -g @angular/cli`
- **Start json-server:** `json-server --watch db.json`
- **Serve Angular app:** `ng serve`
- **Add Angular component:** `ng g c <component_name>`

---

Happy recommending! 🎥🍿
