import { PORT } from "./config";
import { baseRouter } from "./server/baseRouter";
import serverConfig from "./server/serverConfig";
import express from "express";

const { app } = serverConfig({
    app: express(),
    baseRouter
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});