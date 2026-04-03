require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const errorMiddleware = require("./middlewares/error.middleware");


const app = express();

// 🔹 DB Connection
connectDB();

// 🔥 IMPORTANT: Stripe needs raw body
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// 🔹 Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "Task Management System API Running" });
});

// 🔹 Stripe Success Redirect (optional)
app.get("/success", (req, res) => {
  res.send("Payment Successful ✅");
});

// ================= ROUTES =================

// 🔹 Auth
const authRoutes = require("./modules/auth/auth.routes");
app.use("/api/auth", authRoutes);

// 🔹 Company
const companyRoutes = require("./modules/company/company.routes");
app.use("/api/companies", companyRoutes);

// 🔹 Users
const userRoutes = require("./modules/user/user.routes");
app.use("/api/users", userRoutes);

// 🔹 Plans
const planRoutes = require("./modules/plan/plan.routes");
app.use("/api/plans", planRoutes);

// 🔹 Payments (Stripe)
const paymentRoutes = require("./modules/payment/payment.routes");
app.use("/api/payments", paymentRoutes);

// 🔹 Webhook (Stripe)
const webhookRoutes = require("./modules/webhook/webhook.routes");
app.use("/api/webhooks", webhookRoutes);

// 🔹 Projects
const projectRoutes = require("./modules/project/project.routes");
app.use("/api/projects", projectRoutes);

// 🔹 Tasks
const taskRoutes = require("./modules/task/task.routes");
app.use("/api/tasks", taskRoutes);

// 🔹 Comments
const commentRoutes = require("./modules/comment/comment.routes");
app.use("/api/comments", commentRoutes);

// 🔹 Activity
const activityRoutes = require("./modules/activity/activity.routes");
app.use("/api/activity", activityRoutes);

// 🔹 Error Handler
app.use(errorMiddleware);

// 🔹 Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));