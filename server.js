const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Optional for .env use

const app = express();
const PORT = 3001;

app.use(cors());

const API_TOKEN = '12e8e3aa5ab04cd08056e928e9f2a880'; // You can also use process.env.FOOTBALL_API_KEY

app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches?status=SCHEDULED', {
      headers: { 'X-Auth-Token': API_TOKEN }
    });

    const matches = response.data.matches.map(match => ({
      team1: match.homeTeam.name,
      team2: match.awayTeam.name,
      date: match.utcDate,
      competition: match.competition.name,
      status: match.status,
      venue: match.venue || 'TBD',
      matchday: match.matchday || 'TBD',
      stage: match.stage || 'TBD',
      referee: match.referees?.[0]?.name || 'TBD'
    }));

    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
