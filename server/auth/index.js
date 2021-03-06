const router = require('express').Router();
const User = require('../db/models');
module.exports = router;

router.get('/login', ((req, res, next)=>{
  req.body.delete('isAdmin');
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (user.password === req.body.password){
        console.log('successfully logged in')
      } else {
        console.log('back, you fiend of hell!')
      }
    })
    .catch(next);
}))

router.post('/signup', (req, res, next)=>{
  req.body.delete('isAdmin');
  User.findOrCreate({where: {email: req.body.email}, defaults: {
    password: req.body.password,
    userName: req.body.userName,
    profilePic: req.body.profilePic
  }})
    .spread((user, created)=>{ 
      if(created){
        console.log('ONE OF US. ONE OF US. ONE OF US.')
      } else {
        if(user.password === req.body.password){
          console.log(`You're already in the system, homie!`);
        } else {
          console.log('That email is associated with an existing account. Re-enter password.')
        }
      }
    })
})

router.get('/me', (req, res, next) => {
  res.json(req.user);
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy()
  res.sendStatus(204);
});