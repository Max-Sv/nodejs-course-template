const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});
router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.status(200).send('ok');
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.save(req.body);
    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    res.status(404).end('Not found');
  }
});
router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    res.status(404).end('Not found');
  }
});

module.exports = router;
