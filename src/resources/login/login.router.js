const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const token = await loginService.getToken({ login, password });
    res.json({ token });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
