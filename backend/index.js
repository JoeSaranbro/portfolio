import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import argon2 from "argon2"
import mysql2 from "mysql2"
import dotenv from "dotenv"

dotenv.config()
const app = express()




const db = mysql2.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0
})




//If there is a auth problem
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P0rtf0li0';

app.use(express.json());
app.use(cors());

//----------------------Start JWT authen -------------------------------------------------

const users = [{
    id: "1",
    username: "joe",
    password: "Joesaran0000",
    isAdmin: true,
    },
    {
        id: "2",
        username: "jay",
        password: "Jay0000",
        isAdmin: false,
    }]

let refreshTokens = []

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey",{expiresIn: "15m"})
}

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey")
}

    
app.post("/api/login",(req,res)=> {
    const {username, password} = req.body;
    const user = users.find((u)=> {
        return u.username === username && u.password === password;
    });
    if(user){
        //Generate an access token
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        
        
        res.json({
            username: user.username,
            isAdmin: user.isAdmin,
            id: user.id,
            accessToken,
            refreshToken
        })
    }else {
        res.status(400).json("Username or password is incorrect!")
    }
})


app.post("/api/refresh", (req,res) => {
    //take the refresh token from the user
    const refreshToken = req.body.token
    
    //send error if there is no token or it's invalid
    if (!refreshToken) {
        return res.status(401).json("You are not authenticated!")
    }
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is invalid!")
    }

    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        if (err) {
            console.log(err)
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
        const newAccessToken = generateAccessToken(user)
        const newRefreshToken = generateRefreshToken(user) 
        
        refreshTokens.push(newRefreshToken)

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        })
        
    })
    //if everything is ok send new token to user.
    
})

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "mySecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!")
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("Yor are not authenticated!")
    }
};

app.delete("/api/users/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("User has been deleted.")
    } else {
        res.status(403).json("You are not allowed to delete this user!")
    }
});

app.post("/api/logout", verify, (req, res)=> {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
    res.status(200).json("You logged out succesfully.")
})
//----------------------End JWT authen -------------------------------------------------
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

//----------------------Start Todo App -------------------------------------------------

app.get("/todo_items", (req,res) => {
    const q = "SELECT * FROM todo_item"
    db.execute(q, (err,data)=> {
        if(err) {
            return res.json(err)
        }
        else {
            return res.json(data)
        }
    });
    db.unprepare(q);
});


app.post("/todo_items", (req,res)=>{
    const q = "INSERT INTO todo_item (`title`,`details`) VALUES (?,?)";
    const values = [req.body.title,
                    req.body.details];

//Note insert into จะต่างจากคำสั่งอื่นในการใช้ execute, ตรง values ต้องเอา [] ออก
    db.execute(q, values, (err,data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
    db.unprepare(q);
});

app.put("/todo_items/:id", (req, res) => {
    const todoId = req.params.id;
    const q = "UPDATE todo_item SET `title`= ?, `details`= ?, `date_start` = ?, `date_end` = ? WHERE id = ?";
  
    const values = [
        req.body.title,
        req.body.details,
        req.body.date_start,
        req.body.date_end,
    ];
  
    db.execute(q, [...values,todoId], (err, data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
    db.unprepare(q);
  });

app.delete("/todo_items/:id", (req,res)=>{
    const todoId = req.params.id
    const q = "DELETE FROM todo_item WHERE id = ?";
  
    db.execute(q, [todoId], (err,data) => {
        if (err) {
            return res.json(err);
        } else {
            return res.json(data);
        }
    });
    db.unprepare(q);
});
//----------------------Start Login/Sign up TodoApp -------------------------------------------------

   //------------------------------Start Sign up page-----------------------------------------------------
            app.post("/is-email-available", (req, res) => {
                const q = "SELECT * FROM users WHERE user_email = ?";
                const values = req.body[0];
                const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" )
                const response = {emailValidation: null, isEmailAvailable: null}
            
                db.execute(q, [values], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                
                if (email_pattern.test(values)) {
                    
                    response.emailValidation = true;
                } else {
                    response.emailValidation = false
                    return res.json(response);
                }
            
                if (data.length > 0) {
                    response.isEmailAvailable = false;
                    console.log(data.length)
                    return res.json(response);
                } else {
                    console.log(data.length)
                    response.isEmailAvailable = true;
                    return res.json(response)
                }
                
                });
            });

            app.post("/todo_items/signup", async (req,res)=> {
                
                
                const q = "INSERT INTO users (`user_name`,`user_password`,`user_email`) VALUES (?,?,?)";
                try {
                    const hash = await argon2.hash(req.body[0].password);
                    console.log(hash)
                    const values = [
                        req.body[0].username,
                        hash,
                        req.body[0].email,
                ]
                
                    db.execute(q, values, (err,data) => {
                        if (err) {
                            console.log(err)
                            return res.json(err);
                        } else {
                            return res.json(data);
                        }
                    });
                    db.unprepare(q);
                  } catch (err) {
                    console.log(err)
                  }

                //   db.execute(q, values, (err,data) => {
                //     if (err) {
                //         return res.json(err);
                //     } else {
                //         return res.json(data);
                //     }
                // });
                // db.unprepare(q);

                // const user = users.find((u)=> {
                //     return u.username === username && u.password === password;
                // });
                // if(user){
                //     //Generate an access token
                //     const accessToken = generateAccessToken(user)
                //     const refreshToken = generateRefreshToken(user)
                //     refreshTokens.push(refreshToken)
                    
                    
                //     res.json({
                //         username: user.username,
                //         isAdmin: user.isAdmin,
                //         id: user.id,
                //         accessToken,
                //         refreshToken
                //     })
                // }else {
                //     res.status(400).json("Username or password is incorrect!")
                // }
                
            })

    //------------------------------End Sign up page-----------------------------------------------------


//----------------------Start Login/Sign up TodoApp -------------------------------------------------


//----------------------End Todo App -------------------------------------------------

app.listen(8800, ()=> {
    console.log("Hello")
})