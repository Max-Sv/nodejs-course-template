const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(200).send(tasks.map(Task.toResponse));
});
router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  res.status(200).send(Task.toResponse(task));
});
router.route('/:id').delete(async (req, res) => {
  const result = await tasksService.get(req.params.id);
  // catch erorr
  if (result) res.sendStatus(200);
});
router.route('/').post(async (req, res) => {
  const task = await tasksService.save(Task.fromRequest(req.dody));
  // catch erorr
  res.status(200).send(Task.toResponse(task));
});
router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.id,
    Task.fromRequest(req.dody)
  );
  // catch erorr
  res.status(200).send(Task.toResponse(task));
});

module.exports = router;
