const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  await res.json(boards.map(Board.toResponse));
});
router.route('/:id').get(async (req, res) => {
  const board = await boardsService.get(req.params.id);
  res.status(200).send(Board.toResponse(board));
});
router.route('/:id').delete(async (req, res) => {
  const result = await boardsService.remove(req.params.id);
  // catch erorr
  if (result) res.sendStatus(200);
});
router.route('/').post(async (req, res) => {
  const board = await boardsService.save(Board.fromRequest(req.dody));
  // catch erorr
  res.status(200).send(Board.toResponse(board));
});
router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(
    req.params.id,
    Board.fromRequest(req.dody)
  );
  // catch erorr
  res.status(200).send(Board.toResponse(board));
});

module.exports = router;
