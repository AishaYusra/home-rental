const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");
const uuid = require("uuid");
const db = require("./db");

// create your app
const app = express();

// declare the port
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log("Entered");
    next();
});

app.use(
    cors({
        origin: ["http://127.0.0.1:5500"],
        credentials: true,
    })
);

app.get('/getProperty', async (req, res) => {

    let sql = `SELECT * FROM rentalform`

    const [response] = await db.execute(sql)
    res.status(200).json({ message: response })

})

app.post("/postProperty", async (req, res) => {
    const { name, price, city, address, unitnumber, roomtype } = req.body;
    try {
        if (!name) throw Error("Please insert your name");
        if (!price) throw Error("Please insert a price");
        if (!city) throw Error("Please insert your city");
        if (!address) throw Error("Please enter your address");
        if (!unitnumber) throw Error("Please insert a unit number");
        if (!roomtype) throw Error("Please insert a room type");

        const id = uuid.v4();

        let sql = `INSERT INTO rentalform (id, name, price, city, address, unitnumber, roomtype,) VALUES 
        ('${id}','${name}','${price}','${city}', '${address}', '${unitnumber}', '${roomtype}')`;

        await db.execute(sql);

        res.status(200).json({ message: "Property Added Successfully!" });
    } catch (error) {
        res.status(400).json({ erorr: error.message });
    }
});

// add your listen port
app.listen(PORT, () => {
    console.log(`Listening From ${PORT}`);
});