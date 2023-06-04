const router = require("express").Router();
const User = require("../models/ser");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");



// Register
router.post("/register", async (req, res) => {

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    try {

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            phone: req.body.phone,
            address: req.body.address,
            fname: req.body.fname,
            lname: req.body.lname,
            isAdmin: req.body.isAdmin,

        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (e) {
        console.log("roror is ", e);
        res.status(500).json(e);
    }

});


//Login
// router.post("/login",async (req,res)=>{
//     try{
//         const user=await User.findOne({username:req.body.username});
//         !user && res.status(401).json("Wrong Credentials");

//         const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);

//         const Originalpassword=hashedPassword.toString(CryptoJS.enc.Utf8);

//         Originalpassword !== req.body.password && 
//           res.status(401).json("Wrong Credentials");

//           const accessToken=jwt.sign({
//             id:user._id,
//             isAdmin:user.isAdmin,
//           },process.env.JWT_SEC,{expiresIn:"3d"});

//         const { password, ...others}=user._doc;


//         res.status(200).json({...others,accessToken});


//     }catch(e){
//         res.status(500).json(e);
//     }
// });

router.post("/admin/login", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send("Plz add email or password")
    try {

        const check = await User.findOne({ username: username })

        const Originalpassword = await bcrypt.compare(
            req.body.password, check.password
        )
        if (!Originalpassword)
            return res.status(401).send({ message: "Invalid Email or Password!!" });





        // const salt =await bcrypt.genSalt(Number(process.env.SALT))
        // const hashPassword= await bcrypt.hash(req.body.password, salt);


        // const hashedPassword=CryptoJS.AES.decrypt(check.password,process.env.PASS_SEC);
        // const Originalpassword=hashedPassword.toString(CryptoJS.enc.Utf8);
        if (check && Originalpassword && check.isAdmin) {
            console.log("admin checked")
            res.status(200).json(check)
        }
        else res.status(400).send("invalid username or password");

    } catch (e) {
        res.status(500).send("Error while checking Admin")
    }
})

router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).send("Plz add email or password")
    try {
        const check = await User.findOne({ username: username })

        // const hashedPassword=CryptoJS.AES.decrypt(check.password,process.env.PASS_SEC);
        const Originalpassword = await bcrypt.compare(
            req.body.password, check.password
        )
        if (!Originalpassword)
            return res.status(401).send({ message: "Invalid Email or Password!!" });



        if (check && Originalpassword) {
            res.status(200).json(check);
        }
        else res.status(400).send("invalid username or password");

    } catch (e) {
        res.status(500).send("Error while checking user")
    }
})


module.exports = router;