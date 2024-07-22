import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';
import urlRoutes from './routes/url.js'; // Updated import name to urlRoutes for clarity

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

// Use the URL routes
app.use('/url', urlRoutes);

// Serve HTML file
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, "urlform.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
