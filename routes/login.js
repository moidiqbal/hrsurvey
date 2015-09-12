var express = require('express');
var dal = require('../dal/dal');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('login');
});

// Authenticate using our plain-object database of doom!

 function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    if(dal.Authenticate(name,pass)){
      // query the db for the given username
      if (!user) return fn(new Error('cannot find user'));
      // apply the same algorithm to the POSTed password, applying
      // the hash against the pass / salt, if there is a match we
      // found the user
      hash(pass, user.salt, function(err, hash){
        if (err) return fn(err);
        if (hash.toString() == user.hash) return fn(null, user);
        fn(new Error('invalid password'));
      })
    }
 }

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

/*
router.get('/', function(req, res){

});
*/

router.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

router.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res){
  console.log(req.body.username);
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
            + ' click to <a href="/logout">logout</a>. '
            + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
          + ' username and password.'
          + ' (use "tj" and "foobar")';
      res.redirect('login');
    }
  });
});

module.exports = router;
