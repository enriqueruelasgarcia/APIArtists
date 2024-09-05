const express = require('express')
const app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.json({ msg: "Node JS API" })
})

app.use(express.urlencoded({ extended: true }));

const router = require('./routes/index.js');
app.use('/api', router)

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening port ${port}`))