var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/create",function(req,res){
    var data = req.body;
  query = "INSERT INTO user values(UUID(),'"+data.FullName+"','"+data.Username+"','"+data.Password+"','"+data.DateOfBirth+"','ea4f1d14-6916-407d-a50d-149c1eb955aa',now(),null,now(),true,false)";
  global.CRUD._add(function(result){
    console.log(result);
    res.send(result);
  },query);
})

module.exports = router;
