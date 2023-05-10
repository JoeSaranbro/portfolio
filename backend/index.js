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
        const ciphertext = CryptoJS.AES.encrypt(message,process.env.SecretKey_Cryptojs).toString();
    
    return ciphertext;
    }

    // Decrypt
    const deCrypt = (ciphertext) => {
        
        const bytes  = CryptoJS.AES.decrypt(ciphertext,process.env.SecretKey_Cryptojs);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
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
            
            // if (1 != 0) {
            //     return res.json("Testttt")
            // }
            
            
            if (!req.cookies["auth_token"] || !req.cookies["refresh_token"]) {
                return res.status(401).json("You're not authenticated!")
            }
            
            
              
            const auth_token = deCrypt(req.cookies["auth_token"])
            const refresh_token = deCrypt(req.cookies["refresh_token"])

            
            console.log("is it still do")
            console.log(req.cookies["auth_token"])
            console.log("Test Decrypt")
            console.log(auth_token)
           // console.log(refresh_token)
            
           try {
            
           
            const verifyingRefreshToken = () =>{
                //check if there is refresh token
                if (refresh_token) {
                    jwt.verify(refresh_token, process.env.SecretKey_RefreshToken,(err, decoded) => {

                        
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

                                    const new_auth_token = jwt.sign({ user_id: decoded.id, email: decoded.email, role: decoded.isAdmin }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                                    const new_refresh_token = jwt.sign({ user_id: decoded.id, email: decoded.email, role: decoded.isAdmin }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})

                                    const encrypted_auth_token = enCrypt(new_auth_token)
                                    const encrypted_refresh_token = enCrypt(new_refresh_token)


                                    console.log("gen new auth and refresh successfully.")
                                    
                                    res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                                    res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                                    

                                    //fetch todo items from user email
                                    const q = "SELECT * FROM todo_item WHERE user_id = ?"
                                    db.execute(q, [decoded.user_id], (err,data)=> {
                                        if(err) {
                                            console.log("fetch error after veriying refresh token")
                                            return res.status(500).json(err)
                                        }
                                        else {
                                            console.log("no error, here data")
                                            return res.json(data)
                                        }
                                    });
                                    
                                    db.unprepare(q);

                                } //token is valid but expired and user didn't use application within 2 days after expired, we won't give them new token.
                                else {
                                    console.log("token is valid but expired and user didn't use application within 2 days after expired, we won't give them new token")
                                    return res.status(401).json("You're not authenticated");
                                }
                                
                                
                            } //catch other error 
                            else {
                                return res.status(401).json("You're not authenticated!")
                            }
                        } 
                        //Refresh Token is valid and not expired, we'll give user new access token
                         else {
                            console.log("Refresh Token is valid and not expired, we'll give u new access token")
                            
                            const new_auth_token = jwt.sign({ user_id: decoded.user_id, email: decoded.email, role: decoded.isAdmin }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                            const encrypted_auth_token = enCrypt(new_auth_token) 
                            res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                            
                            //fetch todo items from user email
                            const q = "SELECT * FROM todo_item WHERE user_id = ?"
                            db.execute(q, [decoded.user_id], (err,data)=> {
                                if(err) {
                                    console.log("fetch error 1")
                                    return res.json(err)
                                }
                                else {
                                    console.log("no error, here data")
                                    return res.json(data)
                                }
                            });
                            
                            db.unprepare(q);


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
                    console.log("is here")
                    const q = "SELECT * FROM todo_item WHERE user_id = ?"
                    try {
                    
                    const [rows, fields] = await db.execute(q, [decoded.user_id]);
                    
                    db.unprepare(q);
                    
                    
                    return res.json(rows)
                    } catch (error) {
                    db.unprepare(q);
                    console.log(error)
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
            console.log("try catch error ")
            console.log(error)
        }
            
        });

        
    //---------------------- End Authentication -------------------------------------------------
// Verify  token

const verifyTokens =  (authToken, refreshToken) => {
    if (!authToken || !refreshToken) {

        return false
    } else { 
    const auth_token = deCrypt(authToken)
    const refresh_token = deCrypt(refreshToken)
    console.log(auth_token)
    console.log(refresh_token)
    try {
        const decoded_auth_token = jwt.verify(auth_token, process.env.SecretKey_AccessToken);
        const decoded_refresh_token = jwt.verify(refresh_token, process.env.SecretKey_RefreshToken);

        if (decoded_auth_token && decoded_refresh_token) {
            return decoded_auth_token
        } else {
            return false
        }
    } catch (error) {
        return false
    }

    }
    
    
}
// 
//Update,edit todo items
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

app.put("/todo_items/:id", async (req, res) => {
    
    const verified = verifyTokens(req.cookies["auth_token"],req.cookies["refresh_token"])
    
    if (!verified) {
        console.log("You're not authenticated!")
        return res.status(401).json("You're not authenticated!")
    } else {
        
    try {
    // get a todo data from database
        console.log("Before db.execute");
        const fetchSpecificTodo = "SELECT * FROM todo_item WHERE todo_id = ?"
        const [rows] = await db.execute(fetchSpecificTodo, [req.params.id]);
        //check if payload user_id and authToken user_id is match?
        if (rows[0].user_id !== verified.user_id) {
            console.log("You're not allowed!")
            db.unprepare(fetchSpecificTodo);
            return res.status(401).json("You're not allowed!")
        }
        
        
        
        

    
    
    

        
        const todoId = req.params.id;
        const updateTodo = "UPDATE todo_item SET `title`= ?, `details`= ?, `date_start` = ?, `date_end` = ?,`user_email` = ?, `user_id` = ? WHERE todo_id = ?";
    
        const values = [
            req.body.title,
            req.body.details,
            req.body.date_start,
            req.body.date_end,
            req.body.user_email,
            req.body.user_id,
            
            
        ];
        
        //updating todo
         const [row] =  await db.execute(updateTodo, [...values,todoId]);
            
         if (row.affectedRows  === 0 ) {
            db.unprepare(updateTodo);
            return res.status(400).json("Bad request, user not found.")

         } else {
            db.unprepare(updateTodo);

            //fetch data to return updated data after updating
            const fetchTodo = "SELECT * FROM todo_item WHERE user_id = ?"
                try {
               console.log("fetch data to return updated data after updating")
               const [row] = await db.execute(fetchTodo, [verified.user_id]);
               console.log("fetch updated data successfully")
                    db.unprepare(fetchTodo);
                    return res.json(row);
                
                } catch (error) {
                    db.unprepare(fetchTodo);
                    return res.status(500).json("Failed to fetch items!")
                }
         }
      
    } 
    catch (error) {
        console.log("try catch Error!")
        console.log(error)
       
        return res.status(400).json("Bad Request")
    }
    }
  });

app.delete("/todo_items/:id", (req,res)=>{
    const todoId = req.params.id
    const q = "DELETE FROM todo_item WHERE todo_id = ?";
  
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
                const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")
                const response = {emailValidation: null, isEmailAvailable: null}

                if (email_pattern.test(values)) {
                    response.emailValidation = true;
                } else {
                    response.emailValidation = false
                    return res.json(response);
                }
            
                
                db.execute(q, [values], (err, data) => {
                
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                
                if (data.length > 0) {
                    response.isEmailAvailable = false;
                    
                    return res.json(response);
                } else {
                    response.isEmailAvailable = true;
                    return res.json(response)
                }
                
                });
                db.unprepare(q);

                console.log("check email available")
            });

            app.post("/todo_app/signup", async (req,res)=> {
                const username_pattern = new RegExp("^[a-zA-Z0-9_]{8,20}$")
                const password_pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/)
                const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")

                const signupResponse = {signupSuccessfully:null, inputValidation:null, isEmailAvailable:null}

                const check_email = "SELECT * FROM users WHERE user_email = ?";


                const checkEmail = () => {
                    return new Promise((resolve, reject) => {
                      db.execute(check_email, [req.body.email], (err, data) => {
                        if (err) {
                          reject(err);
                        } else {
                          resolve(data);
                        }
                      });
                    });
                  };
                
                  try {
                    const data = await checkEmail();
                    
                    if (data.length > 0 || !username_pattern.test(req.body.username) || !password_pattern.test(req.body.password) || !email_pattern.test(req.body.email) || req.body.password !== req.body.confirm_password) {
                      signupResponse.isEmailAvailable = false;
                      signupResponse.inputValidation = false;
                      return res.json(signupResponse);
                    } else {
                      signupResponse.isEmailAvailable = true;
                      signupResponse.inputValidation = true;
                    }
                  } catch (err) {
                    console.log(err);
                    return res.json({ error: "Internal Server Error" });
                  }
            
                  db.unprepare(check_email);

                 
                    const addUser = "INSERT INTO users (`user_name`,`user_password`,`user_email`) VALUES (?,?,?)";

                try {
                    const hash = await argon2.hash(req.body.password);
                    
                    const values = [
                        req.body.username,
                        hash,
                        req.body.email,
                ]       
                    
                    db.execute(addUser, values, (err,data) => {
                        if (err) {
                            console.log(err)
                            signupResponse.signupSuccessfully = false;
                            return res.json(signupResponse);
                        } else {
                            signupResponse.signupSuccessfully = true;
                            return res.json(signupResponse);
                        }
                    });
                    db.unprepare(addUser);
                  } catch (err) {
                    console.log(err)
                  }
                
            })

    //------------------------------End Sign up page-----------------------------------------------------
    
    //------------------------------Start Login page-----------------------------------------------------

    

    app.post("/todo_app/login",async (req,res)=> {

        

        const password_pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/)
        const email_pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")

        const loginResponse = {loginSuccessfully:null,inputValidation:null, msg:null}

        if (email_pattern.test(req.body.email) && password_pattern.test(req.body.password) ) {
            loginResponse.inputValidation = true;
          } else {
            loginResponse.inputValidation = false;
            loginResponse.loginSuccessfully = false;
            loginResponse.msg = "Username or Password is incorrect!";
            return res.json(loginResponse)
          }

          const values = [req.body.email]
          const query_password = "SELECT * FROM users WHERE user_email = ? "

        try {
            const data = await new Promise((resolve, reject) => {
              db.execute(query_password, values, (err, data) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(data);
                }
              });
            });
          
            db.unprepare(query_password);
            
            if (data.length > 1) {
              //ถ้าบังเอิญมีEmail ซ้ำกันในระบบฐานข้อมูล
              loginResponse.loginSuccessfully = false;
              loginResponse.msg = "There is something wrong!";
              return res.json(loginResponse);
            } else if (data.length === 0) {
              //ถ้าuser ใส่ email หรือ password ผิด
              loginResponse.loginSuccessfully = false;
              loginResponse.msg = "Username or Password is incorrect!";
              return res.json(loginResponse);
            } else {
              try {
                
                if (await argon2.verify(data[0].user_password, req.body.password)) {
                  //Password does match
                  loginResponse.loginSuccessfully = true;
                  loginResponse.msg = "Login Success.";
                  console.log("login success");

                  const auth_token = jwt.sign({ user_id: data[0].user_id, email: data[0].user_email, role: data[0].user_role, }, process.env.SecretKey_AccessToken,{expiresIn: "15m"})
                  console.log(auth_token)
                  const refresh_token = jwt.sign({ user_id: data[0].user_id, email: data[0].user_email, role: data[0].user_role }, process.env.SecretKey_RefreshToken,{expiresIn: "30d"})
                  
                  const encrypted_auth_token = enCrypt(auth_token)
                  const encrypted_refresh_token = enCrypt(refresh_token)
                    
                  
                 // res.cookie('auth_token', access_token, cookieOptions);
                  res.cookie('auth_token', encrypted_auth_token, access_token_cookieOptions);
                  res.cookie('refresh_token', encrypted_refresh_token, refresh_token_cookieOptions);
                  loginResponse.url = "/todo_items";
                  return res.json(loginResponse);

                } else {
                  //Password does not match
                  loginResponse.loginSuccessfully = false;
                  loginResponse.msg = "Username or Password is incorrect!";
                  console.log("login failed");

                  return res.loginResponse
                }
              } catch (err) {
                console.log(err)
                return res.status(500).json("There is something wrong!");
              }
            }
          } catch (err) {
            console.log(err);
             res.json("err");
          }
        console.log("555")
        
    })

    app.post("/redirect", async (req,res)=> {
        
        
        res.json("kuy")
    })

    
    
      

    //------------------------------End Login page-----------------------------------------------------

//----------------------Start Login/Sign up TodoApp -------------------------------------------------


//----------------------End Todo App -------------------------------------------------

app.listen(8800, ()=> {
    console.log("Hello")
    
})