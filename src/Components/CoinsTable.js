import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
    
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const history = useHistory(); 
  
    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

    // const fetchCoins = async () => {
    //     setLoading(true);
    //     const { data } = await axios.get(CoinList(currency));

    //     setCoins(data);
    //     setLoading(false);
    // };

    console.log(coins);

    useEffect(() => {
        fetchCoins();
    }, [currency])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        );
    };

    const useStyles = makeStyles(() => ({
        row: {
            // backgroundColor: "#16171a",
            backgroundColor: "#26272b",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
                // backgroundColor: "#26272b",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
            //   color: "gold",
              color: "#36bde8",
            },
        },
    }));
    
    const classes = useStyles();

    return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
            <Typography
                variant="h4" 
                style={{ margin: 18, fontFamily: "Montserrat" }}
            >
                Cryptocurrency Market Prices
            </Typography>

            <TextField 
                label="Search for a cryptocurrency..." 
                variant="outlined" 
                style={{ marginBottom: 20, width: "100%" }} 
                onChange={(e) => setSearch(e.target.value)}
            />

            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{ backgroundColor: "#36bde8" }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#36bde8" }}>
                            <TableRow>
                                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => 
                                    <TableCell
                                        style={{ 
                                            color: "black",
                                            fontWeight: "700",
                                            fontFamily: "Montserrat",
                                        }}
                                        key={head}
                                        align={head === "Coin" ? "" : "right"}
                                    >
                                        {head}
                                    </TableCell>
                                )}
                            </TableRow>
                            </TableHead>

                            <TableBody>{handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                const profit = row.price_change_percentage_24h > 0;

                                return (
                                    <TableRow
                                        onClick={() => history.push(`/coins/${row.id}`)}
                                        className={classes.row}
                                        key={row.name}
                                    >
                                        <TableCell
                                            component="th" 
                                            scope="row" 
                                            style={{
                                                display: "flex",
                                                gap: 15,
                                            }}
                                        >  
                                            <img 
                                                src={row?.image} 
                                                alt={row.name} 
                                                height="50" 
                                                style={{ marginBottom: 10 }} 
                                            />
                                            <div
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <span
                                                    style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span style={{ color: "darkgrey" }}>{row.name}</span>
                                            </div>  
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{
                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                fontWeight: 500,
                                            }}
                                        >
                                        {profit && "+"}
                                        {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.market_cap.toString().slice(0.-6))}
                                            {" "}mil
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            
            <Pagination 
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                classes={{ ul: classes.pagination }}
                count={(handleSearch()?.length/10).toFixed(0)} 
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable