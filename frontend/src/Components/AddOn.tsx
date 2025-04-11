import { useState } from "react"

interface Player {
    _id?: string,
    name: string,
    buyIns: number[],
    cashOut: number
}

interface AddOnProps {
    player: Player | null,
    setAddOnBool: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddOn: React.FC<AddOnProps> = ({ player, setAddOnBool }) => {
    const [addOn, setAddOn] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try{
            if (!(Number(addOn) + 1)) throw new Error('Enter a valid number for "AddOn"')
            
            const response = await fetch(`http://localhost:5005/api/players/${player?._id}/add-buyin`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ addOn: addOn })
            })
            
            if (!response.ok) throw new Error('Failed to update player')

            setAddOn("")
            setAddOnBool(false)

            console.log("Success!")

        } catch (error: any) {
            alert(error)

            setAddOn("")

            console.log("Not a Success!")
        }
    }
    
    return (
        <>
            <div>
                <form onSubmit={e => handleSubmit(e)}>
                    <h3>Player: <span style={{ color: "dodgerblue" }}>{player?.name}</span></h3>

                    <h3>Add On For Another:</h3>
                    <input value={addOn} onChange={e => setAddOn(e.target.value)} required></input>
                    <button type="submit">Add On</button>
                </form>

                <button onClick={() => setAddOnBool(false)}>Close</button>
            </div>
        </>
    )
}

export default AddOn