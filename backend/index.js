import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URL } from './config/config.js';

const app = express();
const port = 5000;


const client = new MongoClient(MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

mongoose.connect(MONGO_URL);

const PinSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    name: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

const Pin = mongoose.model('pins', PinSchema);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("The server is running");
});

app.post("/pin", async (req, res) => {
    try {
        const pin = new Pin(req.body);
        let result = await pin.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).send("Error to save pin");
    }
});

app.get("/pins", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.json(pins);
    } catch (error) {
        res.status(500).send("Error to obtain pins");
    }
});

// Ruta para actualizar un pin
app.put("/pin/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedPin = await Pin.findOneAndUpdate({ id: parseInt(id) }, { name }, { new: true });
        if (!updatedPin) {
            return res.status(404).send("Pin not found");
        }
        res.json(updatedPin);
    } catch (error) {
        res.status(400).send("Error updating pin");
    }
});


app.listen(port, () => {
    console.log(`Server listening in port  ${port}`);
});