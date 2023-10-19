import React from "react";
import {Button, styled} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const CustomButton = styled(Button)({
    marginLeft: "1rem",
    height: "4.13rem",
    maxWidth: "45px",
    minWidth: "45px",
});

function StockResult({ stockData, watchlist = false }) {
    return (
        <ul className="search-results">
            {stockData.map((result) => (
                <div className="result-container">
                    <div key={result.id} onClick={() => {
                        window.location.href = `/stock/view/${result["ticker"]}`
                    }} className="result-item">
                        <div className="result-left">
                            <span>{`${result["ticker"]}`}</span>
                            <span>{`|`}</span>
                            <span>{`${result.name}`}</span>
                        </div>
                        <div className="result-middle">
                            <div className="score">
                                <div className={`score-value score-${result.value}`}>{result.value}</div>
                                <div className="score-label">Value</div>
                            </div>
                            <div className="score">
                                <div className={`score-div score-${result.dividend}`}>{result.dividend}</div>
                                <div className="score-label">Dividend</div>
                            </div>
                            <div className="score">
                                <div className={`score-growth score-${result.growth}`}>{result.growth}</div>
                                <div className="score-label">Growth</div>
                            </div>
                        </div>
                        <div className="result-right">
                            <p>${result.price}</p>
                        </div>
                    </div>
                    {
                        watchlist && <div className="btn-container">
                            <CustomButton
                                variant="contained"
                                color="error"
                            >
                                <VisibilityOffIcon />
                            </CustomButton>
                        </div>
                    }
                </div>
            ))}
        </ul>
    )
}

export default StockResult;