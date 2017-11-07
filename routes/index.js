var express = require('express');
var router = express.Router();
var User = require('../models/User');
var sha256 = require('crypto-js/sha256');
var hmacSHA512 = require('crypto-js/hmac-sha512');
var Base64 = require('crypto-js/enc-base64');

router.get('/users/:id', function (req, res, next) {
  res.status(200).json({
    message: 'hello world'
  });
});

router.post('/signup', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: '사용자 이름과 비밀번호는 필수입니다.'
    });
  } else {
    var hashDigest = sha256(req.body.password);
    var hmacDigest = Base64.stringify(hmacSHA512(hashDigest, req.body.username));

    User.findOne({
      username: req.body.username,
      password: hmacDigest
    }).exec()
      .then((user) => {
        if (!user) {
          var user = new User();

          user.username = req.body.username;
          user.password = hmacDigest;

          user.save()
            .then((data) => {
              res.status(201).json({
                message: '성공적으로 사용자 정보를 생성했습니다.'
              });
            })
            .catch((error) => {
              res.status(500).json({
                message: '서버에 오류가 있었습니다.'
              });
            });
        } else {
          res.status(400).json({
            message: '이미 등록된 사용자입니다.'
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: '서버에 오류가 있었습니다.'
        });
      });
  }
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: '사용자 이름과 비밀번호는 필수입니다.'
    });
  } else {
    var hashDigest = sha256(req.body.password);
    var hmacDigest = Base64.stringify(hmacSHA512(hashDigest, req.body.username));

    User.findOne({
      username: req.body.username,
      password: hmacDigest
    }).select('-password').exec()
      .then((user) => {
        res.status(201).json({
          data: user,
          access_token: hmacDigest
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: '서버에 오류가 있었습니다.'
        });
      });
  }
});

router.get('*', function (req, res, next) {
  res.status(404).json({
    error: 'Invalid URL'
  });
});

router.post('*', function (req, res, next) {
  res.status(404).json({
    error: 'Invalid URL'
  });
});

router.delete('*', function (req, res, next) {
  res.status(404).json({
    error: 'Invalid URL'
  });
});

router.put('*', function (req, res, next) {
  res.status(404).json({
    error: 'Invalid URL'
  });
});

module.exports = router;
