import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
// Set EJS as the template engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src", "views"))

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.get("/", async (req, res) => {
  res.render("home", { title: "Home - Service Network" })
})

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';

    res.render('organizations', { title, organizations });
});

app.get("/projects", async (req, res) => {
  res.render("projects", { title: "Service Projects" })
})

app.get("/categories", async (req, res) => {
  res.render("categories", { title: "Project Categories" })
})


app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});