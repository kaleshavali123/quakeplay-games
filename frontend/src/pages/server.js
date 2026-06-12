const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const games = [
  {
    _id: "1",
    title: "Subway Surfers",
    thumbnail: "https://picsum.photos/300/200?1",
    gameUrl: "https://ly4fsf.csb.app/"
  },
  {
    _id: "2",
    title: "Moto X3M",
    thumbnail: "https://picsum.photos/300/200?2",
    gameUrl: "https://unblockeds-games.com/games/moto-x3m-5/index.html"
  },
  {
    _id: "3",
    title: "Archery World",
    thumbnail: "https://picsum.photos/300/200?3",
    gameUrl: "https://play.famobi.com/archery-world-tour/A1000-10"
  }
];

app.get("/api/games", (req, res) => {
  res.json(games);
});

app.get("/api/games/:id", (req, res) => {
  const game = games.find(g => g._id === req.params.id);
  res.json(game);
});

app.listen(5000, () => console.log("Server running on 5000"));