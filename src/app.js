// app.js
import express from "express";

import authRoutes from "./routes/auth.route.js";
import subscriptionsRoutes from "./routes/subscription.route.js";
import adminRoutes from "./routes/admin.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);

export default app;