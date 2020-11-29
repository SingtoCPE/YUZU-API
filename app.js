const dotenv = require('dotenv');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const port = 3001;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port : 3307,
});

app.get('/employee', (req, res) => {
  let sql = `SELECT * FROM quiz.employee 
  inner join quiz.department 
  on quiz.employee.department_code = quiz.department.department_code`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});


app.post('/employee/create', (req, res) => {
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1);
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  let sql = `INSERT INTO quiz.employee (employee_name, email, address, phone, department_code, date_insert)
  VALUES (
    '${req.body.employee_name}', '${req.body.email}', '${req.body.address}',
    '${req.body.phone}', '${req.body.department_code}', ${today}
    )`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

app.post('/employee/update', (req, res) => {
  let sql = `UPDATE quiz.employee SET 
  employee_name='${req.body.employee_name}', email='${req.body.email}', 
  address='${req.body.address}', phone='${req.body.phone}', 
  department_code='${req.body.department_code}' 
  WHERE employee_id=${req.body.employee_id};`;
  db.query(sql, (err, results) => {
    if (err) {
    throw err;
  } else {
    res.json(results);
    }
  });
});

app.post('/employee/delete', (req, res) => {
  let sql = `DELETE FROM quiz.employee WHERE employee_id = ${req.body.employee_id};`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

app.get('/department', (req, res) => {
  let sql = `SELECT * FROM quiz.department`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

app.post('/department/create', (req, res) => {
  var today = new Date();
  var dd = String(today.getDate());
  var mm = String(today.getMonth() + 1);
  var yyyy = today.getFullYear();
  today = `${yyyy}-${mm}-${dd}`;
  let sql = `INSERT INTO quiz.department (department_name, department_code,  date_insert)
  VALUES (
    '${req.body.department_name}', '${req.body.department_code}', '${today}'
    )`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

app.post('/department/update', (req, res) => {
  let sql = `UPDATE quiz.department SET 
  department_name='${req.body.department_name}', department_code='${req.body.department_code}' 
  WHERE department_id='${req.body.department_id}';`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

app.post('/department/delete', (req, res) => {
  let sql = `DELETE FROM quiz.department WHERE department_id = ${req.body.department_id}`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log('API running on port:', port);
});