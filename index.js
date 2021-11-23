import express from "express";
import Mongoose from 'mongoose';
import ArticleController from "./controllers/ArticleController.js";

const APP_PORT  = 8080
const DB_URL    = 'mongodb+srv://wegodev:eh43gr34t27t32e3r@belajar.nafl5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//setting endpoint yang dapat di akses user
app.post('/api/articles', ArticleController.store);

//koneksi ke MongoDB server
Mongoose.connect(DB_URL, {        
  useNewUrlParser     : true, 
  useUnifiedTopology  : true,
  autoIndex: true
});
const db = Mongoose.connection;
db.on('error', (err) => { console.error(err) });
db.once('open', () => { console.log('MongoDB connected') });

//listen port
app.listen(APP_PORT, function () {
  console.log(`Server listening on port ${APP_PORT}`);
});