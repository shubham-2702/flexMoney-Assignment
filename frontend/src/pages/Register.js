import axios from 'axios'
import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const Register = () => {
    const [msg, setMsg] = useState('')
    const submit = (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            age: e.target.age.value,
            batch: e.target.batch.value
        }
        axios.post('http://localhost:8000/register', data)
            .then(response => {
                setMsg("Successfully Paid")
            }).catch(err => {
                if(err.response.status === 403){
                    setMsg('Email already exists or age limit is not satisfied')
                }else{
                    setMsg("Internal Server Error")
                }
            })
    }
    return (
        <>
            <h1>Register</h1>
            <div className='box'>
                <h3>{msg}</h3>
                <Form onSubmit={e => submit(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Age should be in between 18-65" name='age' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Batch</Form.Label>
                        <Form.Control as="select" defaultValue={1} name="batch">
                            <option value={1}>6:00 AM - 7:00 AM</option>
                            <option value={2}>7:00 AM - 8:00 AM</option>
                            <option value={3}>8:00 AM - 9:00 AM</option>
                            <option value={4}>5:00 PM - 6:00 PM</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Pay Rs 500
                    </Button>
                </Form>
            </div>
        </>
    )
}
export default Register