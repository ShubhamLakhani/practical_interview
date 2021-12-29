import React from "react";
import {Form} from "react-bootstrap";

const PRInput = (props) => {
    return (
        <Form.Control type={props.type} name={props.name} value={props.value} placeholder={props.placeholder} onChange={props.handleChange} />
    )
}
export default PRInput