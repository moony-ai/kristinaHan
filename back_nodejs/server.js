const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// BodyParser Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Order Model
const Order = mongoose.model('Order', new mongoose.Schema({
    "ordererName": String,
    "affiliation": String,
    "contact": String,
    "address": String,
    "orderStatus": String,
    "orderNumber": String,
    "creator": String,
    "creationTime": Date,
    "modifier": String,
    "lastModifiedTime": Date,
    "deliveryMethod": String,
    "tuxedoType": String,
    "jacketSize": String,
    "pantsSize": String,
    "shirtSize": String,
    "dressType": String,
    "dressSize": String,
    "ringSizeMen": String,
    "ringSizeWomen": String,
    "necklaceSize": String,
    "earringType": String,
    "bowtie": String,
    "payerName": String,
    "relationToOrderer": String,
    "paymentMethod": String,
    "currency": String,
    "totalPayment": Number,
    "deposit": Number,
    "balance": Number,
    "dressBackWidth": String,
    "dressLength": String,
    "jacketSleeveLength": String,
    "jacketLength": String,
    "pantsWaistLength": String,
    "pantsLength": String,
}));

// POST endpoint to add order
app.post('/add-order', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status
            (201).send('Order saved');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
