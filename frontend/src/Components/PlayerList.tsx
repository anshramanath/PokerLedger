

interface Player {
    _id?: string,
    name: string,
    buyIns: number[],
    cashOut: number
}

interface PlayerListProps {
    players: Player[],
    setAddOnBool: React.Dispatch<React.SetStateAction<boolean>>,
    setPlayer: React.Dispatch<React.SetStateAction<Player | null>>,
    setCashOutBool: React.Dispatch<React.SetStateAction<boolean>>
}

const PlayerList: React.FC<PlayerListProps> = ({ players, setAddOnBool, setPlayer, setCashOutBool }) => {
    console.log(Number(0))
    return (
        <>
            <ul style={{ listStyle: "none"}}>
                {players.map(player => (
                    <li key={player._id}>
                        <div>
                            {(player.cashOut === -1) ? (
                                <>
                                    <h3 style={{ color: "dodgerblue" }}>
                                        <span>{player.name} is currently in for ${player.buyIns.reduce((curr, total) => curr + total, 0)} </span>
                                    
                                        <span>
                                            <button onClick={() => {
                                                setAddOnBool(true),
                                                setPlayer(player)
                                            }}>Add On</button>
                                            <button onClick={() => {
                                                setCashOutBool(true),
                                                setPlayer(player)
                                            }}>Cash Out</button>
                                        </span>
                                    </h3>
                                </>
                                ) : (
                                    <h3 style={{ color: "salmon" }}>
                                        {player.name} was in for ${player.buyIns.reduce((curr, total) => curr + total, 0)} and cashed out for ${player.cashOut}
                                    </h3>
                                )}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default PlayerList