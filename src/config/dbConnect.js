import mongoose from "mongoose";

mongoose.connect("mongodb+srv://priscillatrevizandev:node123@cluster1.vjeffbs.mongodb.net/node?");

let db = mongoose.connection

export default db;
