import { app } from "./app.js";
import userRouter from "./routes/user.js";
import sensorRouter from "./routes/sensor.js";

const port = 3000;

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use(userRouter);
app.use(sensorRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
