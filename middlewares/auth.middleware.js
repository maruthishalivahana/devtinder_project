
// const express = require("express");
// const app = express();

// const authAdmin = app.use("/admin", (req, res, next) => {
//     console.log("admin auth checked")
//     const token = "admin";
//     const isAuthorized = token === "admin";
//     if (!isAuthorized) {
//         res.status(401).send("you are not a admin please try with user auth")
//     }
//     else {
//         next();
//     }
// })

// const authUser = ('/users', (req, res, next) => {
//     console.log("user auth checked");
//     const token = "user";
//     const isUser = token === "user";
//     if (!isUser) {
//         res.status(401).send(" please login first")
//     } else {
//         next();

//     }

// })
// module.exports = {
//     authAdmin,
//     authUser
// }