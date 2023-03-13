const user = process.env.MONGO_INITDB_USERNAME;
const pwd = process.env.MONGO_INITDB_PASSWORD;
const appDatabase = process.env.MONGO_INITDB_DATABASE;
//Create the first admin
db.createUser(
  {
    user: user,
    pwd: pwd,
    roles: [
      { role: "readWrite", db: appDatabase },
    ],
  }
);
db.logs.insertOne({ level: "INFO", message: "SHOP DB ADMIN has been created." });