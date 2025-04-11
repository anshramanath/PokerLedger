import { useState } from "react"

interface Player {
    _id?: string,
    name: string,
    buyIns: number[],
    cashOut: number
}

interface CashOutProps {
    player: Player | null,
    setCashOutBool: React.Dispatch<React.SetStateAction<boolean>>,
}

const CashOut: React.FC<CashOutProps> = ({ player, setCashOutBool }) => {
    const [cashOut, setCashOut] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try{
            if (!(Number(cashOut) + 1)) throw new Error('Enter a valid number for "AddOn"')
            
            const response = await fetch(`http://localhost:5005/api/players/${player?._id}/cashout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cashOut: cashOut })
            })
            
            if (!response.ok) throw new Error('Failed to update player cash out')

            setCashOut("")
            setCashOutBool(false)

            console.log("Success!")

        } catch (error: any) {
            alert(error)

            setCashOut("")

            console.log("Not a Success!")
        }
    }
    
    return (
        <>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <h3>Player: <span style={{ color: "dodgerblue" }}>{player?.name}</span></h3>

                    <h3>Cashing Out For:</h3>
                    <input value={cashOut} onChange={e => setCashOut(e.target.value)} required></input>
                    <button type="submit">Cash Out</button>
                </form>

                <button onClick={() => setCashOutBool(false)}>Close</button>
            </div>
        </>
    )
}

export default CashOut