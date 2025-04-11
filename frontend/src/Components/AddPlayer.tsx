import { useState } from "react"

interface AddPlayerProps {
    setAddPlayerBool: React.Dispatch<React.SetStateAction<boolean>>
}

interface Player {
    _id?: string,
    name: string,
    buyIns: number[],
    cashOut: number
}

const AddPlayer: React.FC<AddPlayerProps> = ({ setAddPlayerBool }) => {
    const [name, setName] = useState<string>("")
    const [buyIn, setBuyIn] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try{
            if (!(Number(buyIn) + 1)) throw new Error('Enter a valid number for "Buy In"')

            let newPlayer: Player = {
                name: name,
                buyIns: [Number(buyIn)],
                cashOut: -1
            }

            const response = await fetch("http://localhost:5005/api/players", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(newPlayer)
            })

            if (!response.ok) throw new Error("Failed to add player")

            setName("")
            setBuyIn("")

            setAddPlayerBool(false)

            console.log("Success!")

        } catch (error: any) {
            alert(error)

            setBuyIn("")

            console.log("Not a Success!")
        }
    }

    return (
        <>
            <div style={{color: "orange"}}>
                <form onSubmit={e => handleSubmit(e)}>
                    <h2>Player Name:</h2>
                    <input value={name} onChange={e => setName(e.target.value)} required></input>

                    <h2>Buy In:</h2>
                    <input value={buyIn} onChange={e => setBuyIn(e.target.value)} required></input>
                    <button type="submit">Add</button>
                </form>

                <button onClick={() => setAddPlayerBool(false)}>Close</button>
            </div>
        </>
    )
}

export default AddPlayer