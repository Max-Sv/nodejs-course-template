const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});
router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.id);
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.boardId, req.params.id);
    res.status(200).send('ok');
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/').post(async (req, res) => {
  try {
    const task = await tasksService.save(req.params.boardId, req.body);
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    res.status(404).end('Not found');
  }
});

module.exports = router;
