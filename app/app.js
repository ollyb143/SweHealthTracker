const express = require('express');
const app = express();

const cors = require('cors')
const corsOptions = {
    origin: ["http://localhost:5173"]
};
app.use(cors(corsOptions));

const port = 3000;

app.get("/api", (req,res) =>{
    res.json({animals:["sheep","pig","cow"]});
});

app.listen(port, () =>{
    console.log("Listening on port "+port);
});