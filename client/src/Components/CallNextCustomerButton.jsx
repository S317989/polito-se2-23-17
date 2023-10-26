import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import TicketAPI from "../APIs/TicketAPI.jsx";


export default function CallNextCustomerButton(props) {
    var officerId = 2;
    var counterId = 4;

    return <Button onClick={async () => {
        var response = await TicketAPI.callNext();
        console.log(response);
    }}>Call Next Customer</Button>
}