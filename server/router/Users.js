const express = require('express')
const cors = require('cors')
const UserModel = require('../models/Users')
const router = express.Router()
router.use(cors())
router.use(express.json())

//get users
router.get('/',cors(),async(req,res) => {
    try
    {
        const users= await UserModel.find()
        res.status(200).json(users)
    }
    catch(error)
    {
        res.send(`Error has occured => ${error}`)
    }
})


//login user
router.post('/login',async(req,res) => {
    try
    {
        const users= await UserModel.findOne({email:req.body.email,password:req.body.password})
        if(users)
        {
            res.json(users)
        }
        else
        {
            res.json("User does not exist!")
        }
    }
    catch(error)
    {
        res.send(`Error has occured => ${error}`)
    }
})

//register user
router.post('/register', async (req, res) => {
    console.log(req.body)
    const users= await UserModel.findOne({username:req.body.username})
    const email = await UserModel.findOne({email:req.body.email})
    const phone = await UserModel.findOne({phone:req.body.phone})
        if(users || email || phone)
        {
            res.json("UserExists")
        }
        else
        {
            const user = req.body
            const newUser = new UserModel(user);
            try{
                await newUser.save()
                res.json(newUser)
            }
            catch(error)
            {
                res.send(`Error has occured => ${error}`)
            }
        }
    
})

module.exports = router