const express = require('express')
const router = express.Router()
const Buyer = require('../models/buyermodel')

const app = express()

// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }))

// Getting All Buyers
router.get('/', (req, res) => {
    try {
        const buyers = Buyer.find()
        res.status(200).send(buyers.json)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Getting One Buyer
router.get('/:id', async (req, res) => {
    try{
        const buyer = await Buyer.findById(req.params.id)
        res.send(buyer.json)
    }
    catch (err){
        res.status(500).json({ message: err.message })
    }
})


// Creating One Buyer
router.post('/', async (req, res) => {
    const newbuyer = new Buyer({
        name: req.body.name,
        items: req.body.items,
        date: req.body.date
    })

    try{
        const done = await newbuyer.save()
        res.status(201).json(done)
    }
    catch (err){
        res.status(400).json({ message: err.message }) 
    }
})


// Updating One Buyer
router.patch('/:id', async (req, res) => {
    try{
        const updbuyer = await Buyer.findById(req.params.id)
        updbuyer.items = req.items.body
        const updated = await updbuyer.save()
        res.status(201).send(updated.json)
    }
    catch(err) {
        res.status(400).json({ message: err.message })
    }
})


// Deleting One Buyer
router.delete('/:id', async (req, res) => {
    try{
        const removebuyer = await Buyer.findById(req.params.id)
        const removed = await removebuyer.delete()
        res.status(201).send(removed.json)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }

})

module.exports = router