const express = require('express')
const cors = require('cors')
const multer = require("multer")
const fs = require("fs")
const PackageModel = require('../models/Package')
const router = express.Router()
router.use(cors())
router.use(express.json())

//setting up storage engine
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename: (req,file,cb)=>{
        cb(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({storage:storage})

//get unapproved Packages
router.get('/notapproved',cors(),async(req,res) => {
    try
    {
        const packages= await PackageModel.find({status:"Not Accepted"})
        res.status(200).json(packages)
    }
    catch(error)
    {
        res.send(`Error has occured => ${error}`)
    }
})

//get approved Packages
router.get('/approved',cors(),async(req,res) => {
    try{
        const AppPackages = await PackageModel.find({status:"Accepted"})
        res.status(200).json(AppPackages)
    }
    catch(error){
        res.send(error)
    }
})

//get individual Package
router.get('/getPackage/:id',async(req,res)=>{
    try{
        console.log(req.params);
        const {id} =req.params;

        const individual_Package = await PackageModel.find({id:id});
        console.log(individual_Package);
        res.status(200).json(individual_Package)
    }
    catch(error)
    {
        res.json(error)
    }
})

//approve Package
router.post('/approve/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const update = await PackageModel.updateOne({id:id},{status:"Accepted"});
        console.log(update)
        res.status(200).json(update)
    }
    catch(error){
        res.json(error)
    }
})

router.post('/disapprove/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const update = await PackageModel.deleteOne({id:id});
        console.log(update)
        res.status(200).json(update)
    }
    catch(error){
        res.json(error)
    }
})

//add package
router.post('/add',upload.single('image'),async (req, res) => {
    const package= await PackageModel.findOne({id: req.body.id})
    const {filename} = req.file;
    if(package)
    {
        res.json("Package with same id exists!")
    }
    else if(!filename){
        res.json("Please choose a file!")
    }
    else
    {
        const Package = new PackageModel({
            name: req.body.name,
            provider: req.body.provider,
            status: req.body.status,
            no_of_places: req.body.no_of_places,
            places: req.body.places,
            phoneno: req.body.phoneno,
            price: req.body.price,
            image: filename,
            description: req.body.description,
            id: req.body.id,
        })
        try{
            await Package.save()
            res.json("Success")
        }
        catch(error)
        {
            res.send(`Error has occured => ${error}`)
        }
    }
})

module.exports = router