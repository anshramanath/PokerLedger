import mongoose from "mongoose"

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    buyIns: { type: [Number], default: [] },
    cashOut: { type: Number, default: -1 }
})

export default mongoose.model("Player", PlayerSchema)