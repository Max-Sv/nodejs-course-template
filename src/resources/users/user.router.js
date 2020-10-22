const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).json(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').delete(async (req, res, next) => {
  try {
    await usersService.remove(req.params.id);
    res.status(200).send('ok');
  } catch (e) {
    return next(e);
  }
});
router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.save(req.body);
    res.status(200).send(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).send(User.toResponse(user));
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
