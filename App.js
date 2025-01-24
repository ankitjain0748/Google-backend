const dotenv = require("dotenv");
dotenv.config();

// require("./dbconfigration");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*", // Allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*', // Allow all headers
  credentials: true,
  optionsSuccessStatus: 200, // for legacy browsers
}

// const logger = require("./utils/Logger");

const DirectionRoutes = require("./route/directionRoutes");
const PlaceRoutes = require("./route/placerouter");


app.use(cors(corsOptions));
app.use(express.json({ limit: '2000mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/direction" ,DirectionRoutes)
app.use("/places" ,PlaceRoutes)



const PORT = process.env.REACT_APP_SERVER_DOMIN || 5000;

app.get("/", (req, res) => {
  res.json({
    msg: 'Hello World',
    status: 200,
  });
});

const server = app.listen(PORT, () => console.log("Server is running at port : " + PORT));
server.timeout = 360000; // 6 minutes