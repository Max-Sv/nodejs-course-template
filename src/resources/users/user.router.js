const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(toResponse));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(OK).send(toResponse(user));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').delete(async (req, res, next) => {
  try {
    const user = await usersService.remove(req.params.id);
    res.status(NO_CONTENT).send(toResponse(user));
  } catch (e) {
    return next(e);
  }
});
router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.save(req.body);
    res.status(OK).send(toResponse(user));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(user));
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
