import { useState, useEffect } from "react"

import AddPlayer from "./Components/AddPlayer"
import PlayerList from "./Components/PlayerList"
import AddOn from "./Components/AddOn"
import CashOut from "./Components/CashOut"
import Ledger from "./Components/Ledger"

interface Player {
  _id?: string,
  name: string,
  buyIns: number[],
  cashOut: number
}

const App: React.FC = () => {
  const [addPlayerBool, setAddPlayerBool] = useState<boolean>(false)
  const [players, setPlayers] = useState<Player[]>([])
  const [addOnBool, setAddOnBool] = useState<boolean>(false)
  const [player, setPlayer] = useState<Player | null>(null)
  const [cashOutBool, setCashOutBool] = useState<boolean>(false)
  const [ledgerBool, setLedgerBool] = useState<boolean>(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5005/api/players')
        const data = await response.json()

        console.log("Fetched Data:", data)
        console.log("Current Players:", players)

        setPlayers(data)
      } catch (err) {
        console.error("Failed to fetch players:", err)
      }
    }

    fetchData()
  }, [addPlayerBool, addOnBool, cashOutBool])

  return (
    <>
      <h1>Poker Ledger</h1>

      {ledgerBool ? (
        <Ledger players={players} setLedgerBool={setLedgerBool}/>
      ) : (
        <div>
          {addPlayerBool ? (
            <AddPlayer setAddPlayerBool={setAddPlayerBool}/>
          ) : (
            <div>
              <button onClick={() => setAddPlayerBool(true)}>+ Add Player</button>
      
              {addOnBool ? (
                <AddOn player={player} setAddOnBool={setAddOnBool}/>
              ) : cashOutBool ? (
                <CashOut player={player} setCashOutBool={setCashOutBool}/>
              ) : (
                <PlayerList players={players} setAddOnBool={setAddOnBool} setPlayer={setPlayer} setCashOutBool={setCashOutBool}/>
              )}


              <button onClick={() => setLedgerBool(true)}>Ledger</button>
            </div>
          )}
        </div>
      )}


    </>
  )
}

export default App
