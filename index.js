//main modules
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

//routes
app.get('/', (req, res) => {
    res.json({
        text: 'api works!'
    });
});

app.post('/api/login', (req, res) => {
    const user = {id: 3};
    //generate a token for this specific user
    const token = jwt.sign({user}, 'my_secret_key');
    res.json({
        token
    });
});

//protected route
app.get('/api/protected', ensureToken ,(req, res) => {
    //verify key through a callback
  jwt.verify(req.token, 'my_secret_key', (err, data) => {
      if (err) {
         res.sendStatus(403);
      } else {
          res.json({
              text: 'protected',
          });
      }
  });
});



//creating a middleware to filter a route
function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if(typeof bearerHeader !== 'undefined'){
         //divide from the empty space
        const bearer = bearerHeader.split(" "); 
        //at the second item
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


//listen to a port in order to execute
app.listen(5000, (req, res) => {
    console.log('Server on port 5000')
});