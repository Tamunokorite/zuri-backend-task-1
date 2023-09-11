'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin: true}))

const today = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
app.get("/", (req, res) => {
    const { slack_name, track } = req.query;
    res.status(200).json({
        slack_name,
        current_day: days[today.getDay()],
        utc_time: today.toISOString(),
        track,
        github_file_url: "",
        github_repo_url: "",
        status_code: 200
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));