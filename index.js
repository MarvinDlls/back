const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoute = require('./routes/recipe');
const infoRoutes = require('./routes/api');

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/recipe";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connexion MongoDB effectuée");
    })
    .catch((error) => {
        console.error("Erreur de connexion à MongoDB :", error);
    });

const allowedOrigins = [
    'http://localhost:5173', // Local
    'https://projet-ecf-marvin.vercel.app/' // Vercel
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Non autorisé par CORS'));
        }
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/recipe", recipeRoute);
app.use("/api", infoRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`L'API est lancée sur l'url http://localhost:${PORT}`);
});