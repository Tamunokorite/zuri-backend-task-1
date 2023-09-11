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
app.get("/api", (req, res) => {
    const { slack_name, track } = req.query;
    if (slack_name && track) {
        res.status(200).json({
            slack_name: slack_name,
            current_day: days[today.getDay()],
            utc_time: today.toISOString(),
            track: track,
            github_file_url: "https://github.com/Tamunokorite/zuri-backend-task-1/blob/main/index.js",
            github_repo_url: "https://github.com/Tamunokorite/zuri-backend-task-1",
            status_code: 200
        });
    } else {
        res.status(400).send("Invalid request");
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

module.exports = app;