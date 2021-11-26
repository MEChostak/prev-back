"use strict";

module.exports = {
  middleware: function middleware(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token']; // check token

    if (!token) {
      return res.status(403).send({
        ok: false,
        message: 'Token não informado'
      });
    } // verifies secret and checks exp


    var jwt = require('jsonwebtoken');

    jwt.verify(token, process.env.SECRETTOKEN, function (err, decoded) {
      if (err) {
        var errMessage = err.message;
        return res.status(403).send({
          ok: false,
          message: 'Falha na autenticação (' + errMessage + ')'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};