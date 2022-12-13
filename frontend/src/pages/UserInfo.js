import { getAllByPlaceholderText } from '@testing-library/react'
import axios from 'axios'
import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const UserInfo = () => {
    const [msg, setMsg] = useState('')
    const [data, setData] = useState({})
    const submit = (e) => {
        e.preventDefault()
        axios.get('/status?email=' + e.target.email.value)
            .then(response => {
                setData(response.data)
            }).catch(err => {
                if(err.response.status === 404){
                    setMsg('User Not Found')
                }else{
                    setMsg("Internal Server Error")
                }
            })
    }

    const getBatch = (n) => {
        if(n === 1){
            return "6:00 AM - 7:00 AM"
        }else if(n === 2){
            return "7:00 AM - 8:00 AM"
        }else if(n === 3){
            return "8:00 AM - 9:00 AM"
        }else{
            return "5:00 PM - 6:00 PM"
        }
    }

    const getDate = (d) => {
        const date = new Date(d)
        return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear()
    }

    const getPaymentStatus = (d) => {
        const date = new Date(d)
        const cdate = new Date()
        if(date.getMonth() !== cdate.getMonth() || date.getFullYear() !== cdate.getFullYear()){
            return "Expired"
        }else{
            return "Active"
        }
    }

    const showData = () => {

        return(
            <div className='box'>
                <div>Email Address: {data.email}</div>
                <div>Age: {data.age}</div>
                <div>Last Payment Date: {getDate(data.payment_date)}</div>
                <div>Batch: {getBatch(data.batch)}</div>
                <div>Subscription: {getPaymentStatus(data.payment_date)}</div>
            </div>
        )
    }
    return (
        <>
            <h1>UserInfo</h1>
            <div className='box'>
                <Form onSubmit={e => submit(e)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name='email' />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Get Info
                    </Button>
                </Form>
            </div>
            {data.email ? showData() : ''}
        </>
    )
}
export default UserInfo