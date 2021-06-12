module.exports = {
  HOST: "localhost",
  DB: "cho",
  USER: "cho",
  PASSWORD: "",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
