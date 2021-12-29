import React from "react";
import { Tab, Row, Col, Nav, Form, Button, Container  } from "react-bootstrap";
import  "./Register.css";
import PRForm from "../../Components/PRForm/PRForm";

const Register = () => {
    
    return (
        <div>
            {/* <PRInput/>
            <PRButton/> */}
            <Container>
                <div className="register-form-box">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Nav variant="pills" className="custom-navs">
                            <Nav.Item>
                            <Nav.Link eventKey="first">FAN SIGNUP</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="second">TLENT SIGNUP</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <PRForm formType="fan"/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <PRForm formType="talent"/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </div>
    )
}
export default Register;