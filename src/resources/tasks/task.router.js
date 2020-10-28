const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(toResponse));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await tasksService.get(req.params.id);
    res.status(OK).send(toResponse(task));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').delete(async (req, res, next) => {
  try {
    const task = await tasksService.remove(req.params.id);
    res.status(NO_CONTENT).send(toResponse(task));
  } catch (e) {
    return next(e);
  }
});
router.route('/').post(async (req, res, next) => {
  try {
    const task = await tasksService.save(req.params.boardId, req.body);
    res.status(OK).send(toResponse(task));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').put(async (req, res, next) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.status(OK).send(toResponse(task));
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
