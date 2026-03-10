import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 3000

// Set EJS as the template engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "src", "views"))

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.get("/", async (req, res) => {
  res.render("home", { title: "Home - Service Network" })
})

app.get("/organizations", async (req, res) => {
  res.render("organizations", { title: "Organizations" })
})

app.get("/projects", async (req, res) => {
  res.render("projects", { title: "Service Projects" })
})

app.get("/categories", async (req, res) => {
  res.render("categories", { title: "Project Categories" })
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})