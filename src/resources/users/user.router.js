const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});
router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).json(User.toResponse(user));
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.status(200).send('ok');
  } catch (e) {
    console.log('e:', e);
    res.status(404).end('Not found');
  }
});
router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.save(req.body);
    res.status(200).send(User.toResponse(user));
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).send(User.toResponse(user));
  } catch (e) {
    res.status(404).end('Not found');
  }
});

module.exports = router;
