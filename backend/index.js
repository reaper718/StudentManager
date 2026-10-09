    const express = require('express');
    const db = require('./utils/db-connections');
    const cors = require('cors');

    const userRouter = require('./routes/userRoutes');

    const app = express();

    app.use(express.json())
    app.use(cors());

    app.use("/users",userRouter);

    db.sync().then(() => {
        app.listen(3000,() => {
        console.log("server is running ")
    })
    }).catch((err) => {
        console.log(err);
    })

