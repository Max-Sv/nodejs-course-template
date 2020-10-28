const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const { toResponse } = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res, next) => {
  try {
    const boards = await boardsService.getAll();
    res.json(boards.map(toResponse));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(OK).send(toResponse(board));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').delete(async (req, res, next) => {
  try {
    const board = await boardsService.remove(req.params.id);
    res.status(NO_CONTENT).send(toResponse(board));
  } catch (e) {
    return next(e);
  }
});
router.route('/').post(async (req, res, next) => {
  try {
    const board = await boardsService.save(req.body);
    res.status(OK).send(toResponse(board));
  } catch (e) {
    return next(e);
  }
});
router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(OK).send(toResponse(board));
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
