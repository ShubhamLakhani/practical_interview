import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PRInput from "./../PRInput/PRInput";
import PRButton from "./../PRButton/PRButton";
import {registration} from "./../../Containers/Register/action"
import { toast } from "react-toastify";
import { isDisabled } from "@testing-library/user-event/dist/utils";

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validPasswordRegex = RegExp(/^.{8,12}$/);
const PRForm = (props) => {
    const [form , setForm] = useState({
        first_name:"",
        last_name:"",
        username:"",
        email:"",
        password:"",
    })
    const [error , setError] = useState({
        first_name:"",
        last_name:"",
        username:"",
        email:"",
        password:"",
    })
    const [firstNameErr, setFirstNameErr] = useState("");
    const [lastNameErr, setLastNameErr] = useState("");
    const [userNameErr, setUserNameErr] = useState("");
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    // const [termCondition, setTermCondition] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'first_name':
              setFirstNameErr(value.length === 0 ? 'First name Required!' : '')
              break;
            case 'last_name':
              setLastNameErr(value.length === 0 ? 'Last name Required!' : '')
              break;
            case 'username':
                setUserNameErr(value.length === 0 ? 'User name Required!' : '')
              break;
            case 'email':
              setEmailErr(value.length === 0 ? 'Email Required!' : (validEmailRegex.test(value) ? '' : 'Email is not valid!'))
              break;
            case 'password':
                setPasswordErr(value.length === 0 ? 'Password Required!' : (validPasswordRegex.test(value) ? '' : 'Password length must be in between 8 to 12 character!'))
              break;
          }
        setForm({...form, [name]: value })
    }

    const handleTermsAndCondition = () => {
        console.log({ isDisabled })
        setIsDisabled(!isDisabled)
        // setTermCondition(!termCondition);
    }

    const submitForm = (e) => {
        e.preventDefault();

        let isFormValid = true;

        if (form.first_name === "" || form.last_name === "" || form.username === "" || form.email === "" || form.password === "") {
            isFormValid = false;
            setFirstNameErr(form.first_name === "" ? "First name required!" : "");
            setLastNameErr(form.last_name === "" ? "Last name required!" : "");
            setUserNameErr(form.username === "" ? "User name required!" : "")
            setEmailErr(form.email === "" ? "Email required!" : (validEmailRegex.test(form.email) ? '' : 'Email is not valid!'))
            setPasswordErr(form.password === "" ? "Password required!" : (form.password >= 8 || form.password <= 12 ? '' : 'Password length must be in between 8 to 12 character!'))
        }

        if(firstNameErr || lastNameErr || userNameErr || emailErr || passwordErr) {
            isFormValid = false;
        }

        if(isFormValid) {
            registration(props.formType, form).then(resp => {
                if(resp.status === 201) {
                    setForm({
                        first_name:"",
                        last_name:"",
                        username:"",
                        email:"",
                        password:"",
                    })
                    toast.success(props.formType === "fan" ? "Fan created successfully." : "Talent created successfully.");
                } else {
                    toast.error("Something went wrong.");
                }
            });
        }
    }
    return (
        <div>
            <Form onSubmit={submitForm}>
                <h2>Create Your {props.formType === "fan" ? "Fan" : "Talent"} Account</h2>
                <Form.Group className="form-input" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <PRInput name="first_name" type="text" placeholder="First Name" value={form.first_name} handleChange={handleChange}/>
                    <Form.Text className="text-danger">
                        {firstNameErr}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="form-input" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <PRInput name="last_name" type="text" placeholder="Last Name" value={form.last_name}  handleChange={handleChange}/>
                    <Form.Text className="text-danger">
                        {lastNameErr}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="form-input" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <PRInput name="username" type="text" placeholder="Username" value={form.username} handleChange={handleChange}/>
                    <Form.Text className="text-danger">
                        {userNameErr}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="form-input" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <PRInput name="email" type="text" placeholder="Email" value={form.email} handleChange={handleChange}/>
                    <Form.Text className="text-danger">
                        {emailErr}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="form-input" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <PRInput name="password" type="password" placeholder="Password" value={form.password} handleChange={handleChange}/>
                    <Form.Text className="text-danger">
                        {passwordErr}
                    </Form.Text>
                </Form.Group>
                {/* <Form.Group className="form-input" controlId="formBasicEmail"> */}
                    <Form.Label htmlFor="checkbox" className="checkbox-input">
                        <Form.Control type="checkbox" id="checkbox" onChange={handleTermsAndCondition} />
                        <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg></span>
                        <p>I agree to the <a className="term-condition"> Terms and Conditions.</a></p>
                    </Form.Label>
                {/* </Form.Group> */}

                <div className="text-center">
                    <PRButton type="submit" variant="primary" className="btn-submit" isDisabled={isDisabled}/>
                </div>
            </Form>
        </div>
    )
}

export default PRForm;