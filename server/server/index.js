var express = require("express");
var bodyParser = require("body-parser");
var db = require("../database-mongo");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var cors = require("cors");
var workerOffer = require("./routers/workerOffer");

var app = express();
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

// app.use(express.static(__dirname + "/../react-client/dist"));
//select all the profs that  we have in our database with an array of workers
app.get("/api/profs", function (req, res) {
  console.log("here");
  db.selectAllProf(function (err, data) {
    console.log(data, err);
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});
// the user and the worker login with the username and the password
app.post("/login", (req, res) => {
  let givenPassword = req.body.password;
  console.log(req.body);
  db.selectOneWorker(req.body, async (err, worker) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (!worker) {
        db.selectOneUser(req.body, async (err, user) => {
          if (err) {
            res.sendStatus(500);
          } else {
            let validPass = await bcrypt.compare(givenPassword, user.password);
            if (!validPass) {
              return res.send("Invalid password");
            } else {
              let token = jwt.sign(
                { username: user.username, password: user.password },
                "mysecrettoken"
              );
              res.status(200).header("auth-token", token).send({ token, user });
            }
          }
        });
      } else {
        let validPass = await bcrypt.compare(givenPassword, worker.password);
        if (!validPass) {
          return res.send("Invalid password");
        } else {
          let token = jwt.sign(
            { username: worker.username, password: worker.password },
            "mysecrettoken"
          );
          res.status(200).header("auth-token", token).send({ token, worker });
        }
      }
    }
  });
});

//the user update
app.put("/user/update", function (req, res) {
  db.updateUser(req.body.data, (data) => {
    console.log(data);
    res.send(data);
  });
});
//the worker update
app.put("/worker/update", function (req, res) {
  db.updateWorker(req.body.data, (data) => {
    console.log(data);
    res.send(data);
  });
});
//Worker rigester
app.post("/workerRegister", (req, res) => {
  console.log(req.body);
  var data = req.body.data;
  data.rate = 0;
  db.addWorker(data, (err, worker) => {
    if (err) {
      res.send("Worker not created");
    } else {
      console.log("Worker created successfully");
      res.json(worker);
    }
  });
});
//user adds the order
app.post("/addorder", (req, res) => {
  console.log(req.body);
  var data = req.body.data;
  db.addOrder(data, (err, order) => {
    if (err) {
      res.send("Order not created");
    } else {
      console.log("order created successfully");
      res.json(order);
    }
  });
});
// user register
app.post("/userRegister", (req, res) => {
  console.log(req.body.data);
  db.addUser(req.body.data, (err, user) => {
    if (err) {
      res.send("User not created");
    } else {
      res.json(user);
    }
    console.log("User created successfully");
  });
});
// select all the orders that we have in the database
app.get("/orders", function (req, res) {
  db.selectAllOrders(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

// select the worker orders with the state pending and the worker_id
app.post("/api/orders/pending", function (req, res) {
  console.log(req.body.data);
  db.selectWorkerPandingOrders(req.body.data, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
// select the worker orders with the state doing and the worker_id

app.post("/api/orders/doing", function (req, res) {
  console.log(req.body.data);
  db.selectWorkerDoingOrders(req.body.data, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
// select the worker orders with the state done and the worker_id

app.post("/api/orders/done", function (req, res) {
  console.log(req.body.data);
  db.selectWorkerDoneOrders(req.body.data, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
// when the website get refreched the client sends a token and here the server checks if the token is valid
app.post("/login/auth", function (req, res) {
  console.log(req.body.data);
  jwt.verify(req.body.data, "mysecrettoken", (err, data) => {
    if (data) {
      console.log(data);
      let givenPassword = data.password;
      db.selectOneWorker(data, async (err, worker) => {
        if (err) {
          res.sendStatus(500);
        } else {
          if (!worker) {
            db.selectOneUser(data, async (err, user) => {
              if (err) {
                res.sendStatus(500);
              } else {
                let validPass = givenPassword === user.password;
                if (!validPass) {
                  return res.send("Invalid password");
                } else {
                  res.send(user);
                }
              }
            });
          } else {
            let validPass = givenPassword === user.password;
            if (!validPass) {
              return res.send("Invalid password");
            } else {
              res.send(worker);
            }
          }
        }
      });
    } else {
      res.send("wrong token");
    }
  });
});

// select the user orders with the user_id

app.post("/api/orders/user", function (req, res) {
  console.log(req.body.data);
  db.selectUserOrders(req.body.data, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
// whenever the worker check an order doneor acceptd it updates the state of that order
app.put("/order/update", function (req, res) {
  console.log(req.body);
  db.updateOrder(req.body, function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

app.use("/", workerOffer);
// var port = process.env.PORT || "3000";
app.listen(3000, function () {
  console.log("listening on port 3000!");
});
