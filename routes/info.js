const express = require('express');
const router = express.Router();

require('dotenv').config()
const variableData = process.env.variableData || 'NodeJS Code'

router.get('/', function(req, res, next) {
  res.send({
    name: 'node-docker-gitlab-ci',
    server: 'express',
    variableData: variableData
  });
});

module.exports = router;
