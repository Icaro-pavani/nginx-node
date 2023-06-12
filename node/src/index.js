import express from "express";
import mysql from "mysql";
import { faker } from "@faker-js/faker";

const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('${faker.person.firstName()}')`;
connection.query(sql);
connection.end();

app.get("/", (req, res) => {
  let answer = "<h1>Full Cycle Rocks!</h1><ul>";
  const connection = mysql.createConnection(config);
  const getNamesSql = "SELECT name FROM people";
  connection.query(getNamesSql, function (err, results) {
    console.log(results[0].name);
    if (err) console.log(err);
    results.forEach((result) => {
      console.log(result.name);
      answer += `<li>${result.name}</li>`;
    });
    answer += "</ul>";
    connection.end();
    res.send(answer);
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});
