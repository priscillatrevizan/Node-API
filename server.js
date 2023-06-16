import "dotenv/config";
import express from "express";
import app from "./src/app.js";

const port = process.env.PORT || 4400;


app.listen(port, () =>{
    console.log(`Servidor escutando em http://localhost:${port}`);
});