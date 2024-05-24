// import Product from "@/models/Product";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js")

const handler = async (req, res) => {
  if (req.method == "POST") {
    const {name, email} = req.body;
    let u = new User({name, email, password : CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()});
    u.save();
    res.status(200).json({ success: "success" });
  } else {
    res.status(400).json({ error: "This method is not allowed", error });
  }
//   let products = await Product.find();
//   res.status(200).json({ products });
};

export default connectDb(handler);
// app is the require('mongoose')
// app.post("/User", (req, res) => {
//   var myData = new User(req.body);
//   myData.save()
//   .then(item => {
//   res.send("item saved to database");
//   })
//   .catch(err => {
//   res.status(400).send("unable to save to database");
//   });
//  });

//  export default connectDb(app);