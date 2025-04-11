import express from "express"
import Player from "../models/Player.js"

const router = express.Router()

// GET all players
router.get('/', async (req, res) => {
    try {
        const players = await Player.find()
        res.json(players)
    } catch (err) {
        res.status(500).json({ error: 'Server error fetching players' })
    }
})

// POST new player
router.post('/', async (req, res) => {
    try {
        const { name, buyIns = [], cashOut = -1 } = req.body
        const newPlayer = new Player({ name, buyIns, cashOut })
        const savedPlayer = await newPlayer.save()
        res.status(201).json(savedPlayer)
    } catch (err) {
        res.status(400).json({ error: 'Invalid player data' })
    }
})


router.put('/:id/add-buyin', async (req, res) => {
    try {
        const { addOn } = req.body
  
        const updatedPlayer = await Player.findByIdAndUpdate(
            req.params.id,
            { $push: { buyIns: addOn } },
            { new: true }
        )
  
        if (!updatedPlayer) {
            return res.status(404).json({ error: 'Player not found' })
        }
  
        res.json(updatedPlayer)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


router.put('/:id/cashout', async (req, res) => {
    try {
        const { cashOut } = req.body
  
        const updatedPlayer = await Player.findByIdAndUpdate(
            req.params.id,
            { cashOut: cashOut },
            { new: true }
        )
  
        if (!updatedPlayer) {
            return res.status(404).json({ error: 'Player not found' })
        }
  
        res.json(updatedPlayer)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router