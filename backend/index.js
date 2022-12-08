import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"P0rtf0li0",
    database:"portfolio"
})

//If there is a auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P0rtf0li0';

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/todo_items", (req,res) => {
    const q = "SELECT * FROM todo_item"
    db.query(q, (err,data)=> {
        if(data) {
            return res.json(data)
        }
        else {
            return res.json(err)
        }
    });
});

app.post("/add", (req,res)=>{
    const q = "INSERT INTO todo_item (`title`,`details`) VALUES (?)";
    const values = [req.body.title,
                    req.body.details];

    db.query(q, [values], (err,data) => {
        if (data) {
            return res.json(data);
        } else {
            return res.json(err);
        }
    });
});

app.listen(8800, ()=> {
    console.log("Hello")
})