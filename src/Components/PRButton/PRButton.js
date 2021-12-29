import React from "react";
import { Button } from "react-bootstrap";

const PRButton = (props) => {
    return (
        <Button variant={props.variant} type={props.type} className={props.className} disabled={props.isDisabled}>
            SIGN UP
        </Button>
    )
}
export default PRButton;