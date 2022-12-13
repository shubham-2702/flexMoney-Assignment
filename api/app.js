const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const {MONGO_KEY}=require('./config/keys');
mongoose.set('strictQuery', false)

console.log(MONGO_KEY)
mongoose.connect(MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors())
app.use(express.json())

const schema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    payment_date: {
        type: Date,
        required: true
    },
    batch:{
        type: Number,
        min: 1,
        max: 4,
        required: true
    }
})

const model = new mongoose.model("users", schema)

app.post("/register", (req, res, next) => {
    console.log('hey')
    model.findOne({email: req.body.email})
        .then(result => {
            const date = new Date().toISOString()
            if(!result && req.body.age > 18 && req.body.age < 65){                
                new model({
                    email: req.body.email,
                    age: req.body.age,
                    payment_date: date,
                    batch: req.body.batch
                }).save()
                    .then(response => {
                        res.status(201).send()
                    })
                    .catch(err => {
                        res.status(500).send()
                    })
            }else{
                res.status(403).send()
            }
        })
        .catch(err => {
            res.status(500).send()
        })
})

app.post("/pay", (req, res, next) => {
    console.log('pay')
    model.findOne({email: req.body.email})
        .then(result => {
            if(result){
                const p_date = new Date(result.payment_date)
                const c_date = new Date()
                if(p_date.getMonth() !== c_date.getMonth() || p_date.getFullYear() !== c_date.getFullYear()){
                    model.findOneAndUpdate({email: req.body.email}, {payment_date: c_date.toISOString(), batch: req.body.batch})
                        .then(r => {
                            res.status(200).send()
                        })
                        .catch(err => {
                            res.status(500).send()
                        })
                }else{
                    res.status(403).send()
                }
            }else{
                res.status(404).send();
            }
        })
        .catch(err => {
            res.status(500).send()
        })
})

app.get("/status", (req, res, next) => {
    model.findOne({email: req.query.email})
        .then(result => {
            if(result){
                res.status(200).json(result)
            }else{
                res.status(403).send()
            }
        }).catch(err => {
            res.status(500).send()
        })
})

app.listen(process.env.PORT || 8000);