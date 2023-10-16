import '../styles/Table.css'

function Table({ data }) {
    return (
        <div className="table">
            <table>
                {Object.entries(data).map(([key, value]) => {
                    if(key === 'Breakdown') {
                        return (
                            <thead>
                            <tr>
                                <th>{key}</th>
                                {value.map((value, index) => {
                                    return (
                                        <th key={index}>{value}</th>
                                    )
                                })}
                            </tr>
                            </thead>
                        )
                    } else {
                        return (
                            <tbody>
                            <tr>
                                <th>{key}</th>
                                {value.map((value, index) => {
                                    return (
                                        <td key={index}>{value}</td>
                                    )
                                })}
                            </tr>
                            </tbody>
                        )
                    }
                })}
            </table>
        </div>
    );
}

export default Table