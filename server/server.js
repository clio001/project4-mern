import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port.`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
