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
    ordererName: String,
    affiliation: String,
    contactNumber: String,
    deliveryMethod: String,
    deliveryAddress: String,
    progressStatus: String,
    orderNumber: String,
    orderCreationTime: Date,
    entryAuthor: String,
    lastModifiedTime: Date,
    modifier: String,
    tuxedoType: String,
    jacketSize: String,
    pantsSize: String,
    shirtSize: String,
    dressSize: String,
    ringSizeMale: String,
    ringSizeFemale: String,
    necklaceSize: String,
    earringType: String,
    bowtieHandkerchief: String,
    payerName: String,
    relationshipWithOrderer: String,
    paymentMethod: String,
    paymentCurrency: String,
    totalPayment: Number,
    deposit: Number,
    balancePayment: Number,
    dressBustSize: String,
    dressLength: String,
    jacketSleeveLength: String,
    jacketLength: String,
    pantsWaistSize: String,
    pantsLength: String
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
