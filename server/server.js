const express = require('express');
const app = express();
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

//conecting to mongodb
connectDB()

//define routes and API
app.use(express.json({ extended:false }))
app.use('/api/users', require('./routes/userAPI'))
app.use('/api/products', require('./routes/productsAPI'))


app.get('/', (req, res) => {
  res.send('My app is up')
})


app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
}) 