

interface Player {
    _id?: string,
    name: string,
    buyIns: number[],
    cashOut: number
}

interface LedgerProps {
    players: Player[],
    setLedgerBool: React.Dispatch<React.SetStateAction<boolean>>
}

const Ledger: React.FC<LedgerProps> = ({ players, setLedgerBool}) => {

    const formattedBuyIns = (data: number[]) => {
        let format = "("

        if (data.length == 1) {
           format = format + "$" + data[0] + ")" 
        } else {
            data.map(point => {
                format = format + "$" + point + ", "
            })
            format = format.slice(0, format.length - 2) + ")"
        }

        return format
    }

    return (
        <>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {players.map(player => (
                    <li key={player._id}>
                        <div>
                            {(player.cashOut === -1) ? (
                                <>
                                    <h2 style={{ color: "dodgerblue" }}>
                                        {player.name}
                                    </h2>
                                    <h3 style={{ color: "mediumpurple" }}>
                                        <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>Status: Still Playing</span>
                                        <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>Times Bought In: {player.buyIns.length}</span>
                                        <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>In For: ${player.buyIns.reduce((curr, total) => curr + total, 0)} {formattedBuyIns(player.buyIns)}</span>
                                    </h3>
                                </>
                                ) : (
                                <>
                                    <h2 style={{ color: "dodgerblue" }}>
                                        {player.name}
                                    </h2>
                                    <h3 style={{ color: "mediumpurple" }}>
                                        <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>Status: Cashed Out</span>
                                        <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>Times Bought In: {player.buyIns.length}</span>
                                        <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>Was In For: ${player.buyIns.reduce((curr, total) => curr + total, 0)} {formattedBuyIns(player.buyIns)}</span>
                                        <span style={{ paddingLeft: '20px', paddingRight: '20px' }}>Cashed Out For: ${player.cashOut}</span>
                                        <span
                                            style={{
                                                paddingLeft: '20px',
                                                paddingRight: '20px',
                                                color: (player.cashOut - player.buyIns.reduce((curr, total) => curr + total, 0)) >= 0 ? 'forestgreen' : 'crimson'
                                            }}
                                        >
                                            Net: ${player.cashOut - player.buyIns.reduce((curr, total) => curr + total, 0)}
                                        </span>
                                    </h3>
                                </>
                                )}
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={() => setLedgerBool(false)}>Go Back</button>
        </>
    )
}

export default Ledger