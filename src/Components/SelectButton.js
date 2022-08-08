import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const SelectButton = ({ children, onClick, selected }) => {
    const useStyles = makeStyles({
        selectbutton: {
            border: "1px solid #36bde8",
            borderRadius: 5,
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontFamily: "Montserrat",
            cursor: "pointer",
            backgroundColor: selected ? "#36bde8" : "",
            color: selected ? "black" : "",
            fontWeight: selected ? 700 : 500,
            "&:hover": {
              backgroundColor: "#36bde8",
              color: "black",
            },
            width: "22%",
            margin: 5,
            textAlign: "center",
          },
    });

    const classes = useStyles();
  
    return (
        <span onClick={onClick} className={classes.selectbutton}>
            {children}
        </span>
  )
}

export default SelectButton