import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import argon2 from "argon2"
import mysql2 from "mysql2/promise"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import CryptoJS from "crypto-js" 
import nodemailer from "nodemailer";
import fs from "fs-extra";

import { OAuth2Client } from "google-auth-library"



dotenv.config()
const app = express()
app.use(cookieParser());

const client = new OAuth2Client();


const db = await mysql2.createConnection({
    host: process.env.MYSQL_deploy_HOST,
    user: process.env.MYSQL_deploy_USER,
    password:process.env.MYSQL_deploy_PASSWORD,
    database: process.env.MYSQL_deploy_DATABASE,
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
 
const client_URL = process.env.Client_URL
const backend_URL = process.env.Backend_URL





const port = process.env.PORT || 8800;
//  app.use(cors());

//----------------------End cors -------------------------------------------------




app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

//----------------------Start Todo App -------------------------------------------------

    //---------------------- Start Authentication -------------------------------------------------
    // Encrypt by crypto.js
    
    const enCrypt = (message,secretkey) => {

        try {
        const ciphertext = CryptoJS.AES.encrypt(message,secretkey).toString();
        return ciphertext;
        } catch (error) {
        console.log("try catch enCrypt error",error)
        return false;
        }
        
    
    
    }

    // Decrypt
    const deCrypt = (ciphertext,secretkey) => {
        try {

        //Note: encrypted data can't grab them directly from web developer tools because web browser convert "/" to "%2f" and "+" to "%2B" ,
        //it will cause an error if grab the value directly and decrypt it.
        //always get the value from res.cookie
        const bytes  = CryptoJS.AES.decrypt(ciphertext,secretkey);
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
        sameSite: 'none', // restrict cross-site usage of cookie
        //domain: backend_URL, //if on production set domain: backend_URL, for test don't set domain - leave it blank
        path: "/"
    };

    const refresh_token_cookieOptions = {
        maxAge:  365 * 24 * 60 * 60 * 1000, // expires after 365 days // first number is how many day, second number is 1 day (60 minutes * 24 = 1440)  
        httpOnly: true, // prevent client-side scripts from accessing the cookie
        secure: true, // only send cookie over HTTPS , if you're using localhost http, don't use this line of code.
        sameSite: 'none', // restrict cross-site usage of cookie
        //domain: backend_URL,
        path: "/",
    };
// ------------------------------ End cookies options -----------------------------------

        app.get("/authentication", async (req,res) => {
            
           
            
            
            if (!req.cookies["auth_token"] || !req.cookies["refresh_token"]) {
                console.log("No auth_token || refresh_token")
                return res.status(401).json("You're not authenticated!")
            }
              
            const auth_token = deCrypt(req.cookies["auth_token"],process.env.SecretKey_Cryptojs_JWT)
            const refresh_token = deCrypt(req.cookies["refresh_token"],process.env.SecretKey_Cryptojs_JWT)

            
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

                                    const new_auth_token = jwt.sign({ user_id: decoded.user_id, user_name: decoded.user_name, user_email: decoded.user_email, role: decoded.isAdmin }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                                    const new_refresh_token = jwt.sign({ user_id: decoded.user_id, user_name: decoded.user_name, user_email: decoded.user_email, role: decoded.isAdmin }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})

                                    const encrypted_auth_token = enCrypt(new_auth_token,process.env.SecretKey_Cryptojs_JWT)
                                    const encrypted_refresh_token = enCrypt(new_refresh_token,process.env.SecretKey_Cryptojs_JWT)


                                    console.log("gen new auth and refresh successfully.")
                                    
                                    res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                                    res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                                    

                                    //fetch todo items from user_id
                                    try {
                                    const q = "SELECT * FROM todo_item WHERE user_id = ?"
                                    const [rows] = await db.execute(q, [decoded.user_id]);
                                    const result = [{user_name: decoded.user_name}, rows]
                                   
                                    db.unprepare(q);
                                    return res.json(result)
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
                            
                            
                            const new_auth_token = jwt.sign({ user_id: decoded.user_id, user_name: decoded.user_name, user_email: decoded.user_email, role: decoded.isAdmin }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                            const encrypted_auth_token = enCrypt(new_auth_token,process.env.SecretKey_Cryptojs_JWT) 
                            res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                            
                            //fetch todo items from user_id
                            try {
                                const q = "SELECT * FROM todo_item WHERE user_id = ?"
                                const [rows] = await db.execute(q, [decoded.user_id]);
                                db.unprepare(q);
                                const result = [{user_name: decoded.user_name}, rows]
                                
                                return res.json(result)
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
                    else if (err.name === "TokenExpiredError") 
                    
                    {

                        //check if this user exist in database in case auth_token is expired, search in database
                        console.log("check if this user exist in database in case auth_token is expired")
                        const query_user_info = "SELECT * FROM users WHERE user_email = ? "

                        const decoded = jwt.decode(auth_token, process.env.SecretKey_AccessToken)
                        
                        
                        try {
                            const [rows] = await db.execute(query_user_info, [decoded.user_email]);
                            console.log("rows",rows.length)

                            if (rows.length === 1) {
                                console.log("access token is valid but expired")
                                console.log("we'll give u a new Access Token")
                                verifyingRefreshToken()
                            } else {
                                //result after check user exist in database is not === 1
                                console.log("this user is not exist in database or might have multiple user account in database")
                                return res.status(401).json("You are not authenticated!")
                            }

                        } catch {
                            console.log("this user is not exist in database or might have multiple user account in database")
                            return res.status(500).json("Internal error")
                        }
                        
                        
                    } else {
                        console.log("jwt verify auth token error",err.name)
                        
                        return res.status(401).json("Unknown error")
                    }
                    
                } else {
                    //if there is no error in verify auth token
                    //fetch todo items from user id

                    
                        //check if this user exist in database in case auth_token is not expired
                        console.log("check if this user exist in database in case auth_token is not expired")
                        const query_user_info = "SELECT * FROM users WHERE user_email = ? "
                        const decoded = jwt.decode(auth_token, process.env.SecretKey_AccessToken)
                        
                        try {
                            const [rows] = await db.execute(query_user_info, [decoded.user_email]);
                            

                            if (rows.length === 1) {
                                console.log("access token is valid")
                                
                            } else {
                                //result after check user exist in database is not === 1
                                console.log("this user is not exist in database or might have multiple user account in database")
                                return res.status(401).json("You are not authenticated!")
                            }

                        } catch {
                            console.log("this user is not exist in database or might have multiple user account in database")
                            return res.status(500).json("Internal error")
                        }


                    console.log("auth token is valid,fetch todo items")
                    const q = "SELECT * FROM todo_item WHERE user_id = ?"
                    try {
                    const [rows] = await db.execute(q, [decoded.user_id]);

                    db.unprepare(q);
                    const result = [{user_name: decoded.user_name}, rows]

                    
                    return res.json(result)
                    
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
    
    const auth_token = deCrypt(encryptedAuthToken,process.env.SecretKey_Cryptojs_JWT)
    const refresh_token = deCrypt(encryptedRefreshToken,process.env.SecretKey_Cryptojs_JWT)
    
    if (!auth_token || !refresh_token) {
        
        return false
    } else {
    try {
        
        const decoded_auth_token = jwt.verify(auth_token, process.env.SecretKey_AccessToken);
        const decoded_refresh_token = jwt.verify(refresh_token, process.env.SecretKey_RefreshToken);

        if (decoded_auth_token && decoded_refresh_token) {
            return decoded_auth_token;
        } else {
            return false;
        }
    } catch (error) {
        console.log("verifyTokens try catch error", error)
        return false;
    }
   }

 }
    
    
}





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
const addTodo = "INSERT INTO todo_item (`title`,`details`,`user_id`) VALUES (?,?,?)";
    try {
        const values = [req.body.title,
            req.body.details,
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
        const updateTodo = "UPDATE todo_item SET `title`= ?, `details`= ?, `date_start` = ?, `date_end` = ?, `user_id` = ? WHERE todo_id = ?";
    
        //แก้
        const values = [
            req.body.title,
            req.body.details,
            req.body.date_start,
            req.body.date_end,
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
                const email_pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
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
                const email_pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)

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
                  
                    const addUser = "INSERT INTO users (`user_name`,`user_password`,`user_email`,`user_verification`) VALUES (?,?,?,?)";

                try {
                    const hash = await argon2.hash(req.body.password);
                   
                    const values = [
                        req.body.username,
                        hash,
                        req.body.email,
                        0
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
        const email_pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)

        const response = {status:null,inputValidation:null, msg:null}
        //check if email and password pass a test
        if (email_pattern.test(req.body.email) && password_pattern.test(req.body.password) ) {
            response.inputValidation = true;
          } else {
            console.log("email or password is not pass the regex test")
            response.inputValidation = false;
            response.status = "fail";
            response.msg = "Username or Password is incorrect!";
            return res.json(response)
          }

          
          const query_user_info = "SELECT * FROM users WHERE user_email = ? "

        try {
            const [rows] = await db.execute(query_user_info, [req.body.email]);

            console.log("rows",rows)
            if (rows.length === 1 ) {
                //if there is an email in database

                try {
                    if (await argon2.verify(rows[0].user_password, req.body.password)) {
                      //Password does match
                      //if user email has verified
                      if (rows[0].user_verification === 1) {
                        console.log("user email has verified")
                      

                      response.status = true;
                      response.msg = "Login Success.";
                      console.log("login success");
    
                      const auth_token = jwt.sign({ user_id: rows[0].user_id, user_name: rows[0].user_name, user_email: rows[0].user_email, role: rows[0].user_role, }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                      
                      const refresh_token = jwt.sign({ user_id: rows[0].user_id, user_name: rows[0].user_name, user_email: rows[0].user_email, role: rows[0].user_role }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})
                      
                      const encrypted_auth_token = enCrypt(auth_token,process.env.SecretKey_Cryptojs_JWT)
                      const encrypted_refresh_token = enCrypt(refresh_token,process.env.SecretKey_Cryptojs_JWT)
                        
                      
                     
                      res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                      res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                      

                      response.url = "/todo_items";
                      db.unprepare(query_user_info);
                      
                      return res.json(response);

                    //else if user email has not verified
                    } else {

                        const email_verification = jwt.sign({ user_id: rows[0].user_id,user_email: rows[0].user_email}, process.env.SecretKey_EmailVerification,{expiresIn: "1d"})

                        const enCrypted = () => {
                            try {
                                const ciphertext = CryptoJS.AES.encrypt(email_verification,process.env.SecretKey_Cryptojs_JWT_EmailVerification).toString();
                                return ciphertext;
                                } catch (error) {
                                console.log("try catch enCrypt error",error)
                                return "false";
                                }

                          }

                          
                        console.log("user email has not verified")
                        //send email verification to user's mail
                        try {

                            const transporter = nodemailer.createTransport({
                              service: 'gmail',
                              auth: {
                                user: process.env.Gmail,
                                pass: process.env.GmailP
                              }
                              
                          
                            });
                          
                          
                          const readHTMLFile = async () => {
                              try {
                                  console.log("readHTMLFile success")
                                  const data = await fs.readFile('email_verification_template.html', 'utf8');
                                  return data;
                              } catch (error) {
                                  console.log("readHTMLFile error", error)
                                  return false;
                              }
                          }
                          
                          const htmlContent = await readHTMLFile()

                          
                          //Note If on production, we will use dynamic email which is rows[0].user_email in "to:" below
                            const mailOptions = {
                              from: 'u6111011940013@gmail.com',
                              to: rows[0].user_email,
                              subject: 'Email verification ToDoApp',
                              text: 'Please confirm your email by clicking the link we give you.',
                              html: htmlContent.replaceAll('{{dynamicLink}}',`${backend_URL}/todo_app/email_verification?token=${enCrypted()}`) , // html body
                            };
                          
                            transporter.sendMail(mailOptions, (error, info) => {
                              if (error) {

                                console.log("send mail email_verification error", error);
                                response.status = "fail"
                                response.msg = "There is an error!"
                                response.url = "/error_page"
                                return res.json(response);

                              } else {
                                console.log('Email sent: ' + info.response);
                                response.status = "fail"
                                response.msg = "You've not verified your email!"
                                response.url = "/email_verification_page"
                                return res.json(response);
                                
                              }
                            });
                          
                           }
                            catch (error) {
                                console.log("try catch send email verification error", error)
                                response.status = "fail"
                                response.msg = "There is an error!"
                                response.url = "/error_page"
                                return res.json(response);

                            }


                    }
    
                    } else {
                      //Password does not match
                      response.status = "fail";
                      response.msg = "Username or Password is incorrect!";
                      console.log("Login failed, Password does not match");
                      db.unprepare(query_user_info);
                      return res.json(response)
                    }
                  } catch (error) {
                    console.log(first)
                    console.log("try catch check if email and password match error",error)
                    db.unprepare(query_user_info);
                    return res.status(500).json("There is something wrong!");
                  }

            } else if (rows.length === 0) {
                //ถ้าuser ใส่ email หรือ password ผิด
              response.status = "fail";
              response.msg = "Username or Password is incorrect!";
              db.unprepare(query_user_info);
              return res.json(response);
            } else {
                //ถ้าบังเอิญมีEmail ซ้ำกันในระบบฐานข้อมูล หรือ rows ติดลบ
              console.log("ถ้าบังเอิญมีEmail ซ้ำกันในระบบฐานข้อมูล หรือ rows ติดลบ")
              response.status = "fail";
              response.msg = "There is something wrong!";
              db.unprepare(query_user_info);
              return res.json(response);
            }
            
        } catch (error) {
             db.unprepare(query_user_info);
             console.log("try catch query user_info error",error);
             return res.status(500).json("Internal Error");
          }
        
    })

        // Function to generate OTP with timestamp
    async function generateOTP() {
        try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        return otp;
        } catch (error) {
        
        console.log("generateOTP error", error)
        return "error"
        }
    }
    
    // Function to check OTP and its expiration
    async function checkOTP(enteredOTP, user_email, user_name) {
        try {
        const q = "SELECT otp, time_start FROM otp WHERE user_email = ? AND user_name = ? ORDER BY time_start DESC LIMIT 1"

        const [rows] = await db.execute(q, [user_email, user_name]);
        
    
        if (rows.length === 1) {
            console.log("checkOTP, check if user_email exist in database")
            const storedOTP = rows[0].otp;
            const time_start = rows[0].time_start;
            const currentTime_start = Date.now();
            
    
            // Check if OTP matches and is within the 60-second window
            if (enteredOTP == storedOTP && currentTime_start - time_start <= 60000) {
                console.log("checkOTP, check if otp receive from user and in database is not difference more than 1 minute")
                db.unprepare(q);
            return true;
            }
        }
        console.log("checkOTP, otp or time_start is invalid")
        db.unprepare(q);
        return false;
        } catch (error) {
        console.log("checkOTP function error", error)
        db.unprepare(q);
        return false;
        }
    }

    app.post("/todo_app/forgot_password", async (req,res) => {

        //test email pattern
        const user_email = req.body.email
        const user_name = req.body.username

        const username_pattern = new RegExp("^[a-zA-Z0-9_]{8,20}$");
        const email_pattern = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
        const response = {msg:"", status: "" }

        console.log(req.body)

        
        
                try {
                    //regex test username and email
                    if ( username_pattern.test(user_name) && email_pattern.test(user_email) ) {
                        console.log("pass test")
                        
                        //search for email in database
                        const query_user_info = "SELECT * FROM users WHERE user_name = ? AND user_email = ?"
                        
                        const [rows] = await db.execute(query_user_info, [user_name,user_email]);
                        if (rows.length === 1) {
                            
                            console.log("there is user in database")

                            
                            

                            const otp_identification = jwt.sign({ user_name: rows[0].user_name, user_email: rows[0].user_email }, process.env.SecretKey_OTP,{expiresIn: "2m"})

                            console.log("forgot_password sign jwt")

                            //encrypt jwt
                            try {
                                
                                //console.log("otp_identification", otp_identification)
                                const ciphertext = CryptoJS.AES.encrypt(otp_identification,process.env.SecretKey_Cryptojs_OTP).toString();
                                console.log("forgot_password encrypt jwt ")
                                
                                //Note when set cookie, don't forget to add {withCredentials: true} in request header
                                res.cookie('otp_fgtp', ciphertext, {maxAge:  3 * 60 * 1000, httpOnly: true, secure: true, sameSite: "none", path: "/"}); // add domain: backend_URL if on production
                                console.log("forgot_password set otp cookie ")

                                } catch (error) {
                                console.log("try catch enCrypt otp_identification error",error)
                                
                                response.msg = "There is an error."
                                response.status = "fail"
                                }

                            //generate otp and add it into database    
                            try {
                                

                                const otp_numbers = await generateOTP()

                                if (otp_numbers == "error") {
                                    response.msg = "There is something wrong."
                                    response.status = "fail"
                                    return res.json(response)
                                } else {
                                    const timestamp = new Date();  // Get current timestamp

                                    

                                    const add_otp = "INSERT INTO otp (`user_email`,`user_name`,`otp`,`time_start`) VALUES (?,?,?,?)";
                                    const values = [
                                        rows[0].user_email,
                                        rows[0].user_name,
                                        otp_numbers,
                                        timestamp
                                        ]
                                    
                                    //add otp to database    
                                    const [rows_addOTP] = await db.execute(add_otp,values);
                                    console.log("add otp code to database affectedRows", rows_addOTP.affectedRows)

                                    //send otp code to user email section
                                    try {

                                        const transporter = nodemailer.createTransport({
                                          service: 'gmail',
                                          auth: {
                                            user: process.env.Gmail,
                                            pass: process.env.GmailP
                                          }
                                          
                                      
                                        });
                                      
                                      //readHTMLFile Template
                                      const readHTMLFile = async () => {
                                          try {
                                              console.log("readHTMLFile success")
                                              const data = await fs.readFile('email_OTP.html', 'utf8');
                                              return data;
                                          } catch (error) {
                                              console.log("readHTMLFile error", error)
                                              return false;
                                          }
                                      }
                                      
                                      const htmlContent = await readHTMLFile()

                                      
            
                                      
                                      //Note If on production, we will use dynamic email which is rows[0].user_email in "to:" below
                                        const mailOptions = {
                                          from: 'u6111011940013@gmail.com',
                                          to: "sarankunsutha@gmail.com",//rows[0].user_email,
                                          subject: 'Forgot Password ToDoApp',
                                          text: 'Forgor Password Confirmation',
                                          html: htmlContent.replaceAll('{{dynamicOTP}}',otp_numbers) , // html body
                                        };

                                        

                                        

                                        async function sendMail() {
                                            try {
                                                const info = await transporter.sendMail(mailOptions);
                                                console.log('send mail OTP Success ' + info.response);
                                                response.msg = "We've sent OTP code to your mail, please check it out."
                                                response.status = "success"
                                                
                                                
                                            } catch (error) {
                                                console.log("send mail OTP Error", error);
                                                response.msg = "There is an error!"
                                                response.status = "fail"
                                                
                                            }
                                        }

                                    

                                        await sendMail();
                                        


                                        console.log("after check_sendMail",response)
                                         
                                      
                                        
                                      
                                       }
                                        catch (error) {
                                            console.log("try catch send email verification error", error)
                                            response.status = "fail"
                                            response.msg = "There is an error!"
                                            response.url = "/error_page"
                                            return res.json(response);
            
                                        }

                                    

                                    

                                    
                                    
                                    
                                }
                            } catch (error) {
                                console.log("try catch generate otp and add it into database error")
                                console.log(error)
                                response.msg = "There is an error."
                                response.status = "fail"

                            }


                            
                            
                        } else {
                            console.log("there is no user in database")

                            response.msg = "Please check your username and email again."
                            response.status = "fail"
                        }


                    } else {
                        console.log("forgot_password user input doesn't pass the regex test")
                        response.msg = "username or email is invalid"
                        response.status = "fail"
                    }
                } catch (error) {
                    response.msg = "There is something wrong."
                    response.status = "fail"
                    console.log("forgotpassword error",error)
                }
        
        
        
        return res.json(response)
    })

    app.post("/todo_app/verify_otp", async (req,res) => {

        const response = {msg:"", status: "", url: "" }

        
        const user_otp  = req.body.otp
        
        const otp_pattern = new RegExp('^[0-9]{1,6}$')

        //regex test user_otp
        if (otp_pattern.test(user_otp)) {
            
            console.log("user_otp pass a regex test")
            

        } else {
            console.log("user_otp doesn't pass a regex test")
            response.status = "fail"
            response.msg = "Invalid otp"
            return res.json(response)
        }

        
        
        



        try {
            console.log("verify_otp decrypt jwt ")
            console.log(req.cookies["otp_fgtp"]);
            const decrypted_jwt = deCrypt(req.cookies["otp_fgtp"],process.env.SecretKey_Cryptojs_OTP)
            console.log(decrypted_jwt);

            console.log("verify_otp verify jwt ")
            const decoded = jwt.verify(decrypted_jwt, process.env.SecretKey_OTP);

            //search for email in database
            console.log("before response_checkOTP")

            const response_checkOTP = await checkOTP(user_otp, decoded.user_email, decoded.user_name)
            console.log("after response_checkOTP")
            if (response_checkOTP === true) {
                console.log("verify_otp, otp is valid.")

                try {
                    const reset_password_identification = jwt.sign({ user_name: decoded.user_name, user_email: decoded.user_email }, process.env.SecretKey_Reset_Password,{expiresIn: "5m"})
                
                    const ciphertext = CryptoJS.AES.encrypt(reset_password_identification,process.env.SecretKey_Cryptojs_Reset_Password).toString();
                    
                    //console.log(ciphertext)
                    //Note when set cookie, don't forget to add {withCredentials: true} in request header
                    res.cookie('rst_pwd', ciphertext, {maxAge:  5 * 60 * 1000, httpOnly: true, secure: true, sameSite: "none", path: "/"}); // add domain: backend_URL if on production
                    console.log("sign jwt for reset password")
                    response.status = "success"
                    response.msg = "OTP is valid, we will navigate you to set your new password."
                    response.url = "/resetpassword"
                    
                } catch (error) {
                    console.log("try catch sign jwt reset_password and encrypt jwt error", error)
                    response.status = "fail"
                    response.msg = "there is something wrong."
                }
                


            } else {
                console.log("verify_otp, otp is invalid.")
                response.msg = "OTP is invalid, please try again."
                response.status = "fail"
            }

        } catch (error) {
            console.log("jwt verify_otp is invalid",error)
            response.status = "fail"
            response.msg = "Invalid otp"
        }
       
        console.log("last response verify_otp")
        return res.json(response)
    })

    app.post("/todo_app/reset_password", async (req,res) => {
        const response = {msg:"", status: "", url: "/login" }
        const user_password  = req.body.password;
        const user_confirm_password  = req.body.confirm_password;


        const regexTest = async () => {
            // Perform your regex test here
            
      
            const password_pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/)
            
            
            if ( password_pattern.test(user_password) &&  user_password === user_confirm_password) {
              return true;
            } else {
              return false;
            }
        };

        try {
            const isRegexPass = await regexTest();

            if (isRegexPass) {
                console.log("reset_password user input pass a test")
                
                

                console.log("reset_password decrypt and verify jwt")
                const decrypted_jwt = deCrypt(req.cookies["rst_pwd"],process.env.SecretKey_Cryptojs_Reset_Password)
                const decoded = jwt.verify(decrypted_jwt, process.env.SecretKey_Reset_Password);

                const q = "UPDATE users SET `user_password`= ? WHERE user_name = ? AND user_email = ? ";
    
                const values = [
                    user_password,
                    decoded.user_name,
                    decoded.user_email

                ];
                
                //updating todo
                const [rows] =  await db.execute(q, [values]);
                    
                if (rows.affectedRows  === 1 ) {
                    db.unprepare(q);
                    response.status = "success"
                    response.msg = "Password updated successfully, please try login."
                    

                } else {

                    db.unprepare(q);
                    response.status = "fail"
                    response.msg = "Password failed to update, please try again later."

                }





            } else {
                console.log("reset_password user input doesn't pass the regex test")
                response.msg = "Invalid password."
                response.status = "fail"
            }
              

        } catch (error) {
            console.log("try catch reset_password error ",error)
        }

        return res.json(response)

        





    })


    app.post("/todo_app/login_google", async (req,res)=> {
        
        const decoded = jwt.decode(req.body[0])
        // console.log("req.body[0]",req.body[0])
        // console.log("decoded",decoded)
        const response = {status:null, msg:null}

        //check if gmail has verified from google
        try {
            
        
        if (decoded.email_verified === true) {
            //check email available google
        const q = "SELECT * FROM users WHERE user_email = ?";
        console.log("check email available google")
        const [rows] = await db.execute(q, [decoded.email] )

        async function verify() {
            try {
                const ticket = await client.verifyIdToken({
                    
                    idToken: req.body[0],
                    audience: process.env.GoogleOauthClientID,  // Specify the CLIENT_ID of the app that accesses the backend
                    // Or, if multiple clients access the backend:
                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
                });
                const payload = ticket.getPayload();
                //const userid = payload['sub'];
                // If request specified a G Suite domain:
                // const domain = payload['hd'];
    
                // all user's data that google give
                // console.log("payload ",payload) 
                console.log("gmail is valid")
                const response_verifyingEmailinDatabase = await verifyingEmailinDatabase(payload)
                
                
                return response_verifyingEmailinDatabase;

            } catch (error) {
                
                console.error("verify google id token error",error)
                response.status = "fail";
                response.msg = "Failed to verify google account!";
                
                return response;
            }
          }
          
          const responseVerify = await verify()
          

        //   if (responseVerify.status === false) {
        //     return res.json(response)
        //   } 

          return res.json(responseVerify)
            
            async function verifyingEmailinDatabase(payload){
                
                try {

                    
                    // check if there is email name in database
                    //didn't remove the cache with db.unprepare(q, [values])
                    
                    //Verify the Google ID token
                    console.log("after verify gmail is valid, check if there is gmail in database")
                       
                    //1.if user has already signed up with our sign up system (not sign in with google), reject it
                    if (rows.length === 1 && rows[0].user_password !== null) {
                       
                       response.status = "fail";
                       response.msg = "This email has already signed up, please use another email.";
                       console.log("This email has already signed up, please use another email.")
                       return response;
                       
           
                    } 
                    //2.if user has already signed up by sign in with google, navigate user to todo_items
                    else if (rows.length === 1 && rows[0].user_password === null) {
                         
                       response.status = true;
                       response.msg = "Login successfully.";
                       response.url = "/todo_items";
                       
                       
                        
                       const auth_token = jwt.sign({ user_id: rows[0].user_id, user_name: rows[0].user_name, user_email: rows[0].user_email, role: rows[0].user_role, }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                       const refresh_token = jwt.sign({ user_id: rows[0].user_id, user_name: rows[0].user_name, user_email: rows[0].user_email, role: rows[0].user_role }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})
                        
                       const encrypted_auth_token = enCrypt(auth_token,process.env.SecretKey_Cryptojs_JWT)
                       const encrypted_refresh_token = enCrypt(refresh_token,process.env.SecretKey_Cryptojs_JWT)
                            
                        
                        // res.cookie('auth_token', access_token, cookieOptions);
                       res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                       res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                        

                       response.url = "/todo_items";
                       console.log("logging in through Sign in with google.")
                       return response;
                       
           
                    } 
                    //3.If user has not signed up yet, add user information to database and navigate user to todo_items
                    else if (rows.length === 0) {
           
                       const addUser = "INSERT INTO users (`user_name`,`user_email`,`user_verification`) VALUES (?,?,?)";
           
                           try {
                               
                               const values = [
                                    payload.name,
                                    payload.email,
                                    1
                           ]       
                               const [rows] = await db.execute(addUser,values);
                               response.status = true;
                               response.msg = "Login successfully.";
                               response.url = "/todo_items";
                               db.unprepare(addUser);
           
                               //console.log("userid in database",rows.insertId)
                               
                               
                                
                                const auth_token = jwt.sign({ user_id: rows.insertId, user_name: payload.name, user_email: payload.email, role: null }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                                const refresh_token = jwt.sign({ user_id: rows.insertId, user_name: payload.name, user_email: payload.email, role: null }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})
                                    
                                const encrypted_auth_token = enCrypt(auth_token,process.env.SecretKey_Cryptojs_JWT)
                                const encrypted_refresh_token = enCrypt(refresh_token,process.env.SecretKey_Cryptojs_JWT)
                                        
                                    
                                    // res.cookie('auth_token', access_token, cookieOptions);
                                res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                                res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                                console.log("Successfully sign up user from sign in with google api!")
                               return response;
                               
                             } catch (error) {
                               console.log("Failed to add user from Sign in with google!",error)
                               response.status = "fail";
                               response.msg = "Failed to signup from Sign in with google.";
                               return response
                             }
           
                    } else {
                        response.status = "fail";
                        response.msg = "Failed to login.";
                        console.log("failed to sign up from sign in with google on if else condition might be from rows.length !== 0 || rows.length !== 1 ")
                        console.log("it might cause from this email might have more than 1 email in database, or it could be rows.length === undefined so its cause an error")
                        return response;
                    }
           
                   } catch (error) {
                       response.status = "fail";
                       response.msg = "Error login google ";
                        console.log("try catch verifyingEmailinDatabase error", error)
                        return response;
                   }
            }
            
            
        
        } 
        //if user's gmail has not verified yet.
        else {
            response.status = "fail";
            response.msg = "Gmail has not verified!";
            console.log("Gmail has not verified!")
            return res.json(response)

        }
        
        } catch (error) {
            console.log("error try catch login_google",error) 
            response.status = "fail";
            response.msg = "Failed to login";
            return res.json(response)      
        }
        
        


    })

  

    // async..await is not allowed in global scope, must use a wrapper

    
      

    //------------------------------End Login page-----------------------------------------------------

//----------------------End Login/Sign up TodoApp -------------------------------------------------

// --------------- start email verification  -----------------------------
app.get("/todo_app/email_verification",async (req,res)=> {
    
    //confirm email process, user need to click the link that being sent to user's email to confirm signing up.



    try {
        console.log("token",req.query.token)

        const queryString = req.originalUrl.split('token=')[1];
        

        
        //console.log("queryString",queryString)
        const originalText = deCrypt(queryString,process.env.SecretKey_Cryptojs_JWT_EmailVerification)


        
        
        console.log("bytes",bytes)
        console.log("originalText",originalText)
        jwt.verify(originalText, process.env.SecretKey_EmailVerification, async (err, decoded) => {
            
            if (err) {
                console.log(err)
                console.log("email verification token is not valid")
                return res.redirect(`${client_URL}/error_page`)
            } else {

                const verification = "UPDATE users SET `user_verification` = ? WHERE user_id = ?";
                try {
                    const values = [1,
                        decoded.user_id
                        ];
                        
                    console.log("values",values)
                    const [rows] = await db.execute(verification, values)
                    db.unprepare(verification);  
                    console.log("User verification status successfully.")
                    return res.redirect(`${client_URL}/email_verification_success`)

                    
                } catch (error) {
                    console.log("User verification status fail.",error)
                    db.unprepare(verification);
                    
                    return res.redirect(`${client_URL}/error_page`)
                }


            }
        })

    } catch (error) {
        
    console.log("try catch deCrypt email_verification error",error)
    return res.redirect(`${client_URL}/error_page`)
    }
    



    
    

})
// --------------- end email verification  ----------------------------- 
//----------------------Start Logout  -------------------------------------------------
app.get("/todo_app/logout",async (req,res)=> {
    //sameSite: "none", httpOnly: true, secure: true

    try {
        res.cookie("auth_token", "", { sameSite: "none", httpOnly: true, secure: true, domain: backend_URL, path: "/", expires: new Date(0)  });
        res.cookie("refresh_token", "", { sameSite: "none", httpOnly: true, secure: true, domain: backend_URL, path: "/", expires: new Date(0) });
        res.cookie("fortest","555", {sameSite: "none", httpOnly: true, secure: true, domain: backend_URL, path: "/"} )
        console.log("logout success")
        return res.json("Logout Success")
        
    } catch (error) {
        console.log("delete cookie error", error)
        return res.status(400).json("Logout Error")
    }
    

})

//----------------------End Logout  -------------------------------------------------
//----------------------End Todo App -------------------------------------------------

app.listen(port, ()=> {
    console.log("Hello")
    
})