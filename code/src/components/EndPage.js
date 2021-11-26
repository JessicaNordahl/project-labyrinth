import React from "react";
import { useHistory } from 'react-redux'
import styled from 'styled-components'

const Button = styled.button`
width:150px;
background: #3c4f34;
border: 2px solid black;
border-radius: 5px;
padding: 8px;
color: white;
font-family: 'Courgette', cursive;
font-size: 20px;
font-weight: 600;
letter-spacing: 1.5px;
`
const H3 = styled.h3`
color: black;
`



const EndPage = () => {
    return(
        <div>
        <H3>Nice work! You have made it out of the labyrinth!</H3>

            <Button>Restart labyrinth</Button>
        </div>
    )
}


export default EndPage