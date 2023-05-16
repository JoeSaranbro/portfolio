import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import argon2 from "argon2"
import mysql2 from "mysql2/promise"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import CryptoJS from "crypto-js" 

dotenv.config()
const app = express()
app.use(cookieParser());



const db = await mysql2.createConnection({
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

//----------------------Start cors -------------------------------------------------
const corsOptions = {
    origin: true,
    credentials: true

}
 app.use(cors(corsOptions));
 

//  app.use(cors());

//----------------------End cors -------------------------------------------------



//----------------------Start Practice JWT authen -------------------------------------------------

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
    console.log(user)
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

    jwt.verify("", "myRefreshSecretKey", (err, user) => {
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

//----------------------End Practice JWT authen -------------------------------------------------
app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

//----------------------Start Todo App -------------------------------------------------

    //---------------------- Start Authentication -------------------------------------------------
    // Encrypt by crypto.js
    
    const enCrypt = (message) => {

        try {
        const ciphertext = CryptoJS.AES.encrypt(message,process.env.SecretKey_Cryptojs).toString();
        return ciphertext;
        } catch (error) {
        console.log("try catch enCrypt error",error)
        return false;
        }
        
    
    
    }

    // Decrypt
    const deCrypt = (ciphertext) => {
        try {
        const bytes  = CryptoJS.AES.decrypt(ciphertext,process.env.SecretKey_Cryptojs);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText;
        } catch (error) {
            
        console.log("try catch deCrypt error",error)
        return false;
        }
        
    }

    // ------------------------------ Start cookies options -----------------------------------
    const access_token_cookieOptions = {
        maxAge:  365 * 24 * 60 * 60 * 1000, // expires after 365 days // first number is how many day, second number is 1 day (60 minutes * 24 = 1440)  
        httpOnly: true, // prevent client-side scripts from accessing the cookie
        secure: true, // only send cookie over HTTPS , if you're using localhost http, don't use this line of code.
        sameSite: 'none' // restrict cross-site usage of cookie
    };

    const refresh_token_cookieOptions = {
        maxAge:  365 * 24 * 60 * 60 * 1000, // expires after 365 days // first number is how many day, second number is 1 day (60 minutes * 24 = 1440)  
        httpOnly: true, // prevent client-side scripts from accessing the cookie
        secure: true, // only send cookie over HTTPS , if you're using localhost http, don't use this line of code.
        sameSite: 'none' // restrict cross-site usage of cookie
    };
// ------------------------------ End cookies options -----------------------------------

        app.get("/authentication", async (req,res) => {
            
           
            
            
            if (!req.cookies["auth_token"] || !req.cookies["refresh_token"]) {
                console.log("No auth_token || refresh_token")
                return res.status(401).json("You're not authenticated!")
            }
              
            const auth_token = deCrypt(req.cookies["auth_token"])
            const refresh_token = deCrypt(req.cookies["refresh_token"])

            
           // console.log(refresh_token)
            
           try {
            
           
            const verifyingRefreshToken = () =>{
                //check if there is refresh token
                if (refresh_token) {
                    jwt.verify(refresh_token, process.env.SecretKey_RefreshToken, async (err, decoded) => {

                        
                        //condition if there is an error in verifying refresh token
                        if (err) {
                            //check if token not valid
                            if (err.name === "JsonWebTokenError") {
                                console.log("refresh Token is not valid, go login again")
                                return res.status(401).json("You're not authenticated");
                            } 
                            //check if token is valid but expired
                            else if(err.name === "TokenExpiredError"){
                                
                                const date = new Date(err.expiredAt)
                                const convertDate = date.getTime()
                                const timeRemaining = (convertDate + (2 * 24 * 60 * 60 * 1000));
                                
                                // check if token is valid but expired and user use application within 2 days after expired, we will give user new token
                                if (timeRemaining > Date.now()) {
                                    
                                    console.log("refresh Token is valid but it expired, we'll give you new refresh token")
                                    

                                    const decoded = jwt.decode(refresh_token, process.env.SecretKey_RefreshToken)

                                    const new_auth_token = jwt.sign({ user_id: decoded.id, user_email: decoded.email, role: decoded.isAdmin }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                                    const new_refresh_token = jwt.sign({ user_id: decoded.id, user_email: decoded.email, role: decoded.isAdmin }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})

                                    const encrypted_auth_token = enCrypt(new_auth_token)
                                    const encrypted_refresh_token = enCrypt(new_refresh_token)


                                    console.log("gen new auth and refresh successfully.")
                                    
                                    res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                                    res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                                    

                                    //fetch todo items from user_id
                                    try {
                                    const q = "SELECT * FROM todo_item WHERE user_id = ?"
                                    const [rows] = await db.execute(q, [decoded.user_id]);
                                    db.unprepare(q);
                                    return res.json(rows)
                                    } catch (error) {
                                    console.log("try catch fetch todo items from user email error",error)
                                    db.unprepare(q);
                                    return res.status(500).json("Internal Error")
                                    }

                                } //token is valid but expired and user didn't use application within 2 days after expired, we won't give them new token.
                                else {
                                    console.log("token is valid but expired and user didn't use application within 2 days after expired, we won't give them new token")
                                    return res.status(401).json("You're not authenticated");
                                }
                                
                                
                            } //catch other error 
                            else {
                                console.log("Exceptional error")
                                return res.status(401).json("Exceptional error!")
                            }
                        } 
                        //Refresh Token is valid and not expired, we'll give user new access token
                         else {
                            console.log("Refresh Token is valid and not expired, we'll give u new access token")
                            
                            const new_auth_token = jwt.sign({ user_id: decoded.user_id, user_email: decoded.email, role: decoded.isAdmin }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                            const encrypted_auth_token = enCrypt(new_auth_token) 
                            res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                            
                            //fetch todo items from user_id
                            try {
                                const q = "SELECT * FROM todo_item WHERE user_id = ?"
                                const [rows] = await db.execute(q, [decoded.user_id]);
                                db.unprepare(q);
                                return res.json(rows)
                                } catch (error) {
                                console.log("try catch fetch todo items from user email error",error)
                                db.unprepare(q);
                                return res.status(500).json("Internal Error")
                                }

                        }
                    })
                } else {
                    console.log("You don't have refresh Token, go login again")
                    return res.status(401).json("You are not authenticated!")
                }
            }
            //if auth_token existed
            if (auth_token) {
                //verify access/auth token
                 jwt.verify(auth_token, process.env.SecretKey_AccessToken, async (err, decoded) => {
                    
                 if (err) {
                    if (err.name === "JsonWebTokenError") {
                        
                       console.log("Auth token is not valid, go login again.")
                       return res.status(401).json("You are not authenticated!")
                    } 
                    else if (err.name === "TokenExpiredError") {
                        console.log("access token is valid but expired")
                        console.log("we'll give u a new Access Token")
                        verifyingRefreshToken()
                        
                    } else {
                        console.log(err.name)
                        
                        return res.status(401).json("Unknown error")
                    }
                    
                } else {
                    //fetch todo items from user id
                    console.log("fetch todo items from user id")
                    const q = "SELECT * FROM todo_item WHERE user_id = ?"
                    try {
                    
                    const [rows] = await db.execute(q, [decoded.user_id]);
                    
                    db.unprepare(q);
                    
                    
                    return res.json(rows)
                    } catch (error) {
                    db.unprepare(q);
                    
                    console.log("try catch fetch todo items from user id error",error)
                    return res.status(400).json("Bad request")
                    }
                    
                    
                    
                    }
                    
                })
            }
            // if auth_token is not existed
             else {
                console.log("You don't have auth token, go login!")
                return res.status(401).json("You are not authenticated!")
            }
        }
        catch (error) {
            
            console.log("try catch error authentication",error)
            return res.status(500).json("Internal Error")
        }
            
        });

        
    //---------------------- End Authentication -------------------------------------------------
// Verify  token

const verifyTokens =  (encryptedAuthToken, encryptedRefreshToken) => {
    

    if (!encryptedAuthToken || !encryptedRefreshToken) {
        console.log("no !authToken || !refreshToken")
        return false
    } else { 
    
    const auth_token = deCrypt(encryptedAuthToken)
    const refresh_token = deCrypt(encryptedRefreshToken)
    
    if (!auth_token || !refresh_token) {
        
        return false
    } else {
    try {
        
        const decoded_auth_token = jwt.verify(auth_token, process.env.SecretKey_AccessToken);
        const decoded_refresh_token = jwt.verify(refresh_token, process.env.SecretKey_RefreshToken);

        if (decoded_auth_token && decoded_refresh_token) {
            return decoded_auth_token
        } else {
            return false
        }
    } catch (error) {
        console.log("verifyTokens try catch error", error)
        return false
    }
   }

 }
    
    
}


app.get('/protected-resource', (req, res) => {
    // const accessToken = req.cookies.access_token;
    // if (!accessToken) {
    //   // Access token not found in cookie, prompt user to log in again
    //   res.status(401).send('Access token not found');
    // } else {
    //   // Check if access token has expired
    //   const tokenExpirationTime = ""
    //   const currentTime = new Date().getTime();
    //   if (currentTime >= tokenExpirationTime) {
    //     // Access token has expired, perform silent authentication
    //     const newAccessToken = /* perform silent authentication to obtain new access token */;
    //     const cookieOptions = {
    //       maxAge: 15 * 60 * 1000, // expires after 15 minutes
    //       httpOnly: true, // prevent client-side scripts from accessing the cookie
    //       secure: true, // only send cookie over HTTPS
    //       sameSite: 'strict' // restrict cross-site usage of cookie
    //     };
    //     res.cookie('access_token', newAccessToken, cookieOptions);
    //     res.send('New access token obtained successfully');
    //   } else {
    //     // Access token is still valid, allow access to protected resource
    //     res.send('Access granted');
    //   }
    // }
  });


app.post("/todo_items", async (req,res)=>{
    let verified;
    try {
         verified = verifyTokens(req.cookies["auth_token"],req.cookies["refresh_token"])
    } catch (error) {
        console.log("try catch verified error",error)
        return res.status(400).json("Error")
    }
    
    //check if auth token and refresh token is valid
    if (!verified) {
        console.log(`You're not authenticated! (app.put("/todo_items/:todo_id") )`)
        return res.status(401).json("You're not authenticated!")
    } 

    
    // check if there is an user_id and email in database
    
    try {
        const fetchSpecificUser = "SELECT * FROM users WHERE user_id = ?" 
        const [rows] = await db.execute(fetchSpecificUser, [verified.user_id]);

        console.log(rows)
        console.log("check rows",rows.length)
        if (rows.length !== 1) {
            console.log("user_id doesn't exist in database or there is multiple user_id")
            return res.status(400).json("Bad request")
        }  

    } catch (error) {
        console.log("check if there is an user_id and email in database error", error)
        return res.status(500).json("Internal error")
    }   
    
    
    
//add new todo item
//Note insert into จะต่างจากคำสั่งอื่นในการใช้ execute, ตรง values ต้องเอา [] ออก
const addTodo = "INSERT INTO todo_item (`title`,`details`,`user_email`,`user_id`) VALUES (?,?,?,?)";
    try {
        const values = [req.body.title,
            req.body.details,
            verified.user_email,
            verified.user_id
            ];
            
        console.log(values)
        const [rows] = await db.execute(addTodo, values)
        db.unprepare(addTodo);  
        console.log("added data successfully")
        
    } catch (error) {
        console.log("failed to add todo",error)
        db.unprepare(addTodo);
        
        return res.status(500).json("Internal error")  
    }

    //fetch data to return latest data after adding todo
    const fetchTodo = "SELECT * FROM todo_item WHERE user_id = ?"
                try {
               console.log("fetch data to return updated data after adding")
               const [rows] = await db.execute(fetchTodo, [verified.user_id]);
               console.log("fetch latest data after adding successfully")
                    db.unprepare(fetchTodo);
                    return res.json(rows);
                
                } catch (error) {
                    db.unprepare(fetchTodo);
                    console.log("failed to fetch data after adding todo",error)
                    return res.status(500).json("Failed to fetch items!")
                }
    
    });
    


app.put("/todo_items/:todo_id", async (req, res) => {
    
    const verified = verifyTokens(req.cookies["auth_token"],req.cookies["refresh_token"])
    
    if (!verified) {
        console.log(`You're not authenticated! (app.put("/todo_items/:todo_id") )`)
        return res.status(401).json("You're not authenticated!")
    } else {
        
    try {
    // get a todo data from database
        
        const fetchSpecificTodo = "SELECT * FROM todo_item WHERE todo_id = ?"
        const [rows] = await db.execute(fetchSpecificTodo, [req.params.todo_id]);
        //check if payload user_id and authToken user_id is match?
        
        if (rows[0].user_id !== verified.user_id) {
            console.log("You're not allowed to update!")
            db.unprepare(fetchSpecificTodo);
            return res.status(400).json("Bad request")
        } 

        } catch (error) {
            console.log("get todo data from database error",error)
            return res.status(500).json("Internal Error")
        }
        
        try {
        const todoId = req.params.todo_id;
        const updateTodo = "UPDATE todo_item SET `title`= ?, `details`= ?, `date_start` = ?, `date_end` = ?,`user_email` = ?, `user_id` = ? WHERE todo_id = ?";
    
        const values = [
            req.body.title,
            req.body.details,
            req.body.date_start,
            req.body.date_end,
            req.body.user_email,
            verified.user_id,
            
            
        ];
        
        //updating todo
         const [rows] =  await db.execute(updateTodo, [...values,todoId]);
            
         if (rows.affectedRows  === 0 ) {
            db.unprepare(updateTodo);
            return res.status(400).json("Bad request, user not found.")

         } else {
            db.unprepare(updateTodo);

            //fetch data to return updated data after updating
            const fetchTodo = "SELECT * FROM todo_item WHERE user_id = ?"
                try {
               console.log("fetch data to return updated data after updating")
               const [rows] = await db.execute(fetchTodo, [verified.user_id]);
               console.log("fetch updated data successfully")
                    db.unprepare(fetchTodo);
                    return res.json(rows);
                
                } catch (error) {
                    db.unprepare(fetchTodo);
                    console.log("failed to fetch data after updating ",error)
                    return res.status(500).json("Failed to fetch items!")
                }
         }
    } 
    catch (error) {
        console.log("try catch Update Todo Error!",error)
        return res.status(400).json("Bad Request")
    }
    }
  });

app.delete("/todo_items/:todo_id", async (req,res)=>{
    const verified = verifyTokens(req.cookies["auth_token"],req.cookies["refresh_token"])

    if (!verified) {
        console.log("You're not authenticated!")
        return res.status(401).json("You're not authenticated!")
    } else { 

    const todoId = req.params.todo_id

    const deleteTodo = "DELETE FROM todo_item WHERE todo_id = ?"; 
  try {

    const fetchSpecificTodo = "SELECT * FROM todo_item WHERE todo_id = ?"
        const [rows] = await db.execute(fetchSpecificTodo, [req.params.todo_id]);
        //check if payload user_id and authToken user_id is match?
        
        if (rows[0].user_id !== verified.user_id) {
            console.log("You're not allowed to delete!")
            db.unprepare(fetchSpecificTodo);
            return res.status(400).json("Bad request")
        }

    } catch (error) {
        console.log("Failed to delete todo_item", error)
        return res.status(500).json("Internal Error")
    }

    try{

    const [rows] = await db.execute(deleteTodo, [todoId]);
    db.unprepare(deleteTodo);
    

    if (rows.affectedRows === 1) {
        //fetch data to return latest after delete
        const fetchTodo = "SELECT * FROM todo_item WHERE user_id = ?"
        try {
       console.log("fetch data to return latest after delete")
       const [rows] = await db.execute(fetchTodo, [verified.user_id]);
       console.log("fetch latest data after deleting successfully")
            db.unprepare(fetchTodo);
            return res.json(rows);
        
        } catch (error) {
            db.unprepare(fetchTodo);
            console.log("failed to fetch latest data after deleting",error)
            return res.status(500).json("Failed to fetch items!")
        }
    } else {
        //rows.affectedRows !== 1
        console.log("rows.affectedRows !== 1")
        return res.status(500).json("Internal Error")
    } 
    
    
  } catch (error) {
    db.unprepare(deleteTodo);
    console.log("try catch delete todo error", error)
    return res.status(400).json("Bad Request")
  }
}
});
//----------------------Start Login/Sign up TodoApp -------------------------------------------------

   //------------------------------Start Sign up page-----------------------------------------------------
            app.post("/is-email-available", async (req, res) => {
                const q = "SELECT * FROM users WHERE user_email = ?";
                
                const values = req.body[0];
                const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                const response = {emailValidation: null, isEmailAvailable: null}

                if (email_pattern.test(values)) {
                    response.emailValidation = true;
                } else {
                    response.emailValidation = false
                    return res.json(response);
                }
            
               //check email available
               console.log("check email available")
               const [rows] = await db.execute(q, [values])
               try {
                // check if there is email name in database
                //didn't remove the cache with db.unprepare(q, [values])
                if (rows.length > 0) {
                    console.log("Email is not available")
                    response.isEmailAvailable = false;
                    return res.json(response);

                } else {
                    console.log("yes email is available")
                    response.isEmailAvailable = true;
                    db.unprepare(q, [values])
                    return res.json(response)
                }

               } catch (error) {
                    console.log("try catch check email available error", error)
                    return res.status(500).json({ error: "Internal Server Error" });
               }
                
            });

            app.post("/todo_app/signup", async (req,res)=> {
                const username_pattern = new RegExp("^[a-zA-Z0-9_]{8,20}$")
                const password_pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/)
                const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")

                const signupResponse = {signupSuccessfully:null, inputValidation:null, isEmailAvailable:null}

                const check_email = "SELECT * FROM users WHERE user_email = ?";

                  
                  try {
                    const [rows] = await db.execute(check_email,[req.body.email]);
                    console.log("song rows", rows.length)

                    if (rows.length > 0 || !username_pattern.test(req.body.username) || !password_pattern.test(req.body.password) || !email_pattern.test(req.body.email) || req.body.password !== req.body.confirm_password) {
                      
                      signupResponse.isEmailAvailable = false;
                      signupResponse.inputValidation = false;
                      db.unprepare(check_email);
                      console.log("Signup failed, email is not available or input is invalid!")
                      return res.json(signupResponse);
                    } else {
                      db.unprepare(check_email);
                      console.log("Input validation: Pass")
                      signupResponse.isEmailAvailable = true;
                      signupResponse.inputValidation = true;
                    }
                    
                  } catch (err) {
                    console.log(err);
                    db.unprepare(check_email);
                    return res.json({ error: "Internal Server Error" });
                  }
                  
                    const addUser = "INSERT INTO users (`user_name`,`user_password`,`user_email`) VALUES (?,?,?)";

                try {
                    const hash = await argon2.hash(req.body.password);
                    
                    const values = [
                        req.body.username,
                        hash,
                        req.body.email,
                ]       
                    const [rows] = await db.execute(addUser,values);
                    signupResponse.signupSuccessfully = true;
                    db.unprepare(addUser);
                    console.log("Successfully add user!")
                    return res.json(signupResponse);
                    
                  } catch (error) {
                    console.log("Failed to add user!",error)
                    return res.status(500).json("Internal Error")
                  }
                
            })

    //------------------------------End Sign up page-----------------------------------------------------
    
    //------------------------------Start Login page-----------------------------------------------------

    

    app.post("/todo_app/login",async (req,res)=> {

        

        const password_pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/)
        const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")

        const loginResponse = {loginSuccessfully:null,inputValidation:null, msg:null}
        //check if email and password pass a test
        if (email_pattern.test(req.body.email) && password_pattern.test(req.body.password) ) {
            loginResponse.inputValidation = true;
          } else {
            loginResponse.inputValidation = false;
            loginResponse.loginSuccessfully = false;
            loginResponse.msg = "Username or Password is incorrect!";
            return res.json(loginResponse)
          }

          
          const query_user_info = "SELECT * FROM users WHERE user_email = ? "

        try {
            const [rows] = await db.execute(query_user_info, [req.body.email]);

            if (rows.length === 1 ) {
                //if there is an email in database
                try {
                    if (await argon2.verify(rows[0].user_password, req.body.password)) {
                      //Password does match
                      loginResponse.loginSuccessfully = true;
                      loginResponse.msg = "Login Success.";
                      console.log("login success");
    
                      const auth_token = jwt.sign({ user_id: rows[0].user_id, user_email: rows[0].user_email, role: rows[0].user_role, }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                      console.log(auth_token)
                      const refresh_token = jwt.sign({ user_id: rows[0].user_id, user_email: rows[0].user_email, role: rows[0].user_role }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})
                      
                      const encrypted_auth_token = enCrypt(auth_token)
                      const encrypted_refresh_token = enCrypt(refresh_token)
                        
                      
                     // res.cookie('auth_token', access_token, cookieOptions);
                      res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                      res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                      loginResponse.url = "/todo_items";
                      db.unprepare(query_user_info);
                      return res.json(loginResponse);
    
                    } else {
                      //Password does not match
                      loginResponse.loginSuccessfully = false;
                      loginResponse.msg = "Username or Password is incorrect!";
                      console.log("Login failed, Password does not match");
                      db.unprepare(query_user_info);
                      return res.json(loginResponse)
                    }
                  } catch (error) {
                    console.log(first)
                    console.log("try catch check if email and password match error",error)
                    db.unprepare(query_user_info);
                    return res.status(500).json("There is something wrong!");
                  }

            } else if (rows.length === 0) {
                //ถ้าuser ใส่ email หรือ password ผิด
              loginResponse.loginSuccessfully = false;
              loginResponse.msg = "Username or Password is incorrect!";
              db.unprepare(query_user_info);
              return res.json(loginResponse);
            } else {
                //ถ้าบังเอิญมีEmail ซ้ำกันในระบบฐานข้อมูล หรือ rows ติดลบ
              console.log("ถ้าบังเอิญมีEmail ซ้ำกันในระบบฐานข้อมูล หรือ rows ติดลบ")
              loginResponse.loginSuccessfully = false;
              loginResponse.msg = "There is something wrong!";
              db.unprepare(query_user_info);
              return res.json(loginResponse);
            }
            
          } catch (error) {
             db.unprepare(query_user_info);
             console.log("try catch query user_info error",error);
             return res.status(500).json("Internal Error");
          }
        
    })

   

    
    
      

    //------------------------------End Login page-----------------------------------------------------

//----------------------Start Login/Sign up TodoApp -------------------------------------------------


//----------------------End Todo App -------------------------------------------------

app.listen(8800, ()=> {
    console.log("Hello")
    
})