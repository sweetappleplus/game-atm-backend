import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import userRoutes from "./routes/userRoutes";
import balanceRoutes from "./routes/balanceRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const swaggerDocument = YAML.load("./docs/swagger.yaml");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/balance", balanceRoutes);
app.use("/transaction", transactionRoutes);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
