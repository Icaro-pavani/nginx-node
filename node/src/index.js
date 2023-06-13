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

const createTableSql =
  "CREATE TABLE IF NOT EXISTS people (id INT NOT NULL auto_increment, name varchar(255), primary key(id))";
connection.query(createTableSql);
const sql = `INSERT INTO people(name) values('${faker.person.firstName()}'),('${faker.person.firstName()}'),('${faker.person.firstName()}')`;
connection.query(sql);
connection.end();

app.get("/", (req, res) => {
  let answer = "<h1>Full Cycle Rocks!</h1><ul>";
  const connection = mysql.createConnection(config);
  const getNamesSql = "SELECT name FROM people";
  connection.query(getNamesSql, function (err, results) {
    if (err) console.log(err);
    results.forEach((result) => {
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
