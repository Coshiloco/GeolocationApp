import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import cors from 'cors';
import { MONGO_URL } from './config/config.js';

const app = express();
const port = 5000;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGO_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
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
    res.send("La aplicación está funcionando");
});

app.post("/pin", async (req, res) => {
    try {
        const pin = new Pin(req.body);
        let result = await pin.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).send("Ocurrió un error al guardar el pin");
    }
});

app.get("/pins", async (req, res) => {
    try {
        const pins = await Pin.find();
        res.json(pins);
    } catch (error) {
        res.status(500).send("Error al obtener los pines");
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});