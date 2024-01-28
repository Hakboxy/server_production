const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config()

const ProductRoutes = require("./routes/productRouts")
const categoryRoutes = require("./routes/categoryRoutes")
const userRoutes = require("./routes/userRoutes")
const cartRoutes = require("./routes/cartRoutes")

const initializeTables = require('./database/sync');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), { redirect: false }));

app.use((req, res, next) => {
  req.url = req.url.replace(/\\/g, '/');
  next();
});

(async () => {
    await initializeTables();
  })();

app.get('/',(req,res)=>{
    res.send({message:"hi this is from server"})
})

app.use('/category',categoryRoutes)
app.use('/products',ProductRoutes)
app.use('/users',userRoutes)
app.use('/cart',cartRoutes)

app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
  });

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});