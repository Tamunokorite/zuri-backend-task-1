'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({origin: true}));

function getCurrentUTCTime() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    
  }

const today = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
app.get("/api", (req, res) => {
    const { slack_name, track } = req.query;
    if (slack_name && track) {
        res.status(200).json({
            slack_name: slack_name,
            current_day: days[today.getDay()],
            utc_time: getCurrentUTCTime(),
            track: track.toLowerCase(),
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