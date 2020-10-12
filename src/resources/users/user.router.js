const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
  // await res.json(users.map(User.toResponse));
});
router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  // res.status(200).send(User.toResponse(user));
  if (user) res.status(200).send(User.toResponse(user));
  else res.status(404).end('Not found');
});
router.route('/:id').delete(async (req, res) => {
  const result = await usersService.get(req.params.id);
  // catch erorr
  if (result) res.sendStatus(200);
});
router.route('/').post(async (req, res) => {
  const user = await usersService.save(User.fromRequest(req.dody));
  // const user = await usersService.save(req.dody);
  // catch erorr
  res.status(200).send(User.toResponse(user));
});
router.route('/:id').put(async (req, res) => {
  const user = await usersService.update(
    req.params.id,
    User.fromRequest(req.dody)
  );
  // catch erorr
  res.status(200).send(User.toResponse(user));
});

module.exports = router;
