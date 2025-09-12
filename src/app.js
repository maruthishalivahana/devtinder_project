const express = require("express")
const connectDB = require("./config/Database.js");
const authController = require("./controllers/auth.controller.js")
const app = express();
app.use(express.json())
const port = 3000;
connectDB().then(() => {
    console.log("Database connected successfully")
    app.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
}).catch((err) => {
    console.log("Database connection failed", err)
})

app.post('/register', authController.userRegister)
app.post('/login', authController.userLoign)
app.get('/feed', authController.getFeed)
app.get('/user', authController.getuserbyemail)
app.get('/user/:id', authController.getbyUser)
app.delete('/deleteuser/:id', authController.deleteUser);
app.put('/updateuser/:id', authController.updateUser)




