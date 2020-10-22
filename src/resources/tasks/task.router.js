const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.id);
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').delete(async (req, res, next) => {
  try {
    await tasksService.remove(req.params.boardId, req.params.id);
    res.status(200).send('ok');
  } catch (e) {
    return next(e);
  }
});
router.route('/').post(async (req, res, next) => {
  try {
    const task = await tasksService.save(req.params.boardId, req.body);
    res.status(200).send(Task.toResponse(task));
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
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
