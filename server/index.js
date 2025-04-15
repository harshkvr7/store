import express from "express";
import path from "path";

import branchesRoutes from "./routes/branches.routes.js";
import clothesRoutes from "./routes/clothes.routes.js";
import complaintsRoutes from "./routes/complaints.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import designersRoutes from "./routes/designers.routes.js";
import employeesRoutes from "./routes/employees.routes.js";

const __dirname = path.resolve();

const app = express();
const port = 3000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("hello");
});

app.use("/api/branches", branchesRoutes);
app.use("/api/clothes", clothesRoutes);
app.use("/api/complaints", complaintsRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/designers", designersRoutes);
app.use("/api/employees", employeesRoutes);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get(/.*/, (req,res)=>{
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
})

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
