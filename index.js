import express from "express";
import Mongoose from 'mongoose';
import ArticleController from "./controllers/ArticleController.js";

const ORIGIN    = 'http://localhost:3200'
const APP_PORT  = 8080
const DB_URL    = 'mongodb+srv://wegodev:eh43gr34t27t32e3r@belajar.nafl5.mongodb.net/wegodev?retryWrites=true&w=majority'
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", ORIGIN);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//setting endpoint yang dapat di akses user
app.get('/api/articles', ArticleController.index);
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