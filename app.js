const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const mongoose = require("mongoose");
const AdminBroExpress = require("@admin-bro/express");
const express = require("express");
AdminBro.registerAdapter(AdminBroMongoose);
const app = express();
const Location = mongoose.model("Location", {
  city: String,
  state: String,
});
// we have to connect with the database first so we wrap it with async function
const run = async () => {
  const mongooseDb = await mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
  });

  // Passing resources by giving entire database
  const adminBro = new AdminBro({
    databases: [mongooseDb],
    rootPath: "/admin",
    //... other AdminBroOptions
  });
  const router = AdminBroExpress.buildRouter(adminBro);
  app.use(adminBro.options.rootPath, router);
  app.listen(8080, () => console.log("AdminBro is under localhost:8080/admin"));
};

run();
