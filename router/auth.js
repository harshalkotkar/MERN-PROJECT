const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Authenticate = require('../middleware/Authenticate');


require('../db/conn')
const User = require('../models/userSchema');



router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill the field" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ err: "email already taken" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ err: "password is not matching" });
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ msg: "registered  successfully" })
        }

    } catch (err) {

        console.log("sdsdsdsd" + err);
    }

})
router.post("/signup", async (req, res) => {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "plz fill the field" });
    }
    try {
        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000)
            })

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credientials pass" });
            }
            else {
                return res.json({ msg: "user signed successfully" });
            }
        }
        else {
            return res.status(400).json({ err: "invalid email" });
        }

    } catch (err) {
        console.log(err);
    }
})

router.use(cookieParser());

router.get("/about", Authenticate, (req, res) => {
    console.log('about');
    res.send(req.rootUser);
})

// get useer data for contact us page and home page
router.get("/getdata", Authenticate, (req, res) => {
    console.log('contact');
    res.send(req.rootUser);
})

router.post("/contact", Authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            console.log("error in getting contact details");
            return res.json({ error: "plz fill the contact form" })
        }
        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "user contact succesfully" })
        }
    } catch (error) {
        console.log(error);
    }
})
// logout page
router.get("/logout", (req, res) => {
    console.log('logout');
    res.clearCookie('jwtoken',{path: '/'})
    res.status(200).send("user logout");
})


module.exports = router;