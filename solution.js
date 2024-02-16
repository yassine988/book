import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from 'axios';


const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "123456",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



const title = "The Great Gatsby"
const rating= 4.5
const description=  "The Great Gatsby is a novel by American writer F. Scott Fitzgerald. It is set in the fictional town of West Egg on Long Island in the summer of 1922. The novel follows the story of the mysterious Jay Gatsby and his obsession with the beautiful Daisy Buchanan."
const image =  "/images/tog.jpeg"



async function insertBooks(){
  try {
      await db.query(
          'INSERT INTO list (image, title,rating, description) VALUES ($1, $2, $3, $4)',
          [image,title,rating,description]
      );
  } catch (error) {
      console.error("Error inserting book:", error);
  }
}


// Backend (Express.js)
// Backend (Express.js)

//${searchTerm}



app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM list");
    const items = result.rows;
    res.render("index.ejs", {
      books: items,
    });
  } catch (error) {
    console.error("Error retrieving items:", error);
    res.status(500).send("Error retrieving items");
  }
});

app.get("/jigga", async (req, res) => {
  try {
    const searchTerm = req.query.query; // Extract the search term from query parameters
    const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${searchTerm}-S.jpg`);
    res.json(response.data);
  } catch (error) {
    console.error("Error searching books:", error);
    res.status(500).json({ error: "Error searching books" });
  }
});


app.post("/edit", async (req, res) => {
  // Handle editing an existing book
});

app.post("/delete", async (req, res) => {
  // Handle deleting an existing book
});



app.listen(port, () => {
   console.log(`Server running on port ${port}`);
});
