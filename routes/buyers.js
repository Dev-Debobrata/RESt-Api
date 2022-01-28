const express = require('express')
const router = express.Router()
const Buyer = require('../models/buyermodel')

const app = express()


// Getting All Buyers
router.get('/', async (req, res) => {
    try {
        const buyers = await Buyer.find()
        res.json(buyers)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// Getting One Buyer
router.get('/:id', async (req, res) => {
    try{
        const buyer = await Buyer.findById(req.params.id)
        res.status(200).json(buyer)
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
    let updbuyer = await Buyer.findById(req.params.id)
        if (req.body.name != null) {
            updbuyer.name = req.body.name
        }

        if (req.body.items != null) {
            updbuyer.items = req.body.items
        }
    
    try{
        const updated = await updbuyer.save()
        res.json(updated)
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
        res.json(removed)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

})

module.exports = router