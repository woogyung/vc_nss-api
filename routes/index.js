var express = require('express');
var router = express.Router();
var User = require('../models/User');
var sha256 = require('crypto-js/sha256');
var hmacSHA512 = require('crypto-js/hmac-sha512');
var Base64 = require('crypto-js/enc-base64');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var request = require('request');

var JWT_SECRET = 'vAn!LlaCod!NG';

var corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

var VALID_SECTIONS = [
  'home',
  'opinion',
  'world',
  'national',
  'politics',
  'upshot',
  'nyregion',
  'business',
  'technology',
  'science',
  'health',
  'sports',
  'arts',
  'books',
  'movies',
  'theater',
  'sundayreview',
  'fashion',
  'tmagazine',
  'food',
  'travel',
  'magazine',
  'realestate',
  'automobiles',
  'obituaries',
  'insider'
];

router.get('/status-check', function (req, res, next) {
  res.status(200).json({
    message: 'Hello, Vanilla'
  });
});

router.options('/signup', cors(corsOptions));
router.options('/top-stories/*', cors(corsOptions));

router.post('/signup', cors(corsOptions), function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      message: '사용자 이름과 비밀번호는 필수입니다.'
    });
  } else {
    var hashDigest = sha256(req.body.password);
    var hmacDigest = Base64.stringify(hmacSHA512(hashDigest, req.body.username));

    User.findOne({
      username: req.body.username
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

router.options('/login', cors(corsOptions));
router.options('/top-stories', cors(corsOptions));

router.post('/login', cors(corsOptions), function (req, res, next) {
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
        if (user) {
          console.log(user);

          var token = jwt.sign({
            username: req.body.username
          }, JWT_SECRET, {
            expiresIn: '24h'
          });

          res.status(200).json({
            data: user,
            access_token: token
          });
        } else {
          res.status(401).json({
            message: '사용자 이름과 비밀번호가 틀렸습니다.'
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: '서버에 오류가 있었습니다.',
          error: error
        });
      });
  }
});

router.get('/top-stories/:section_name', cors(corsOptions), function (req, res, next) {
  var authorizationHeader = req.get('authorization');

  if (!authorizationHeader || authorizationHeader.indexOf('Bearer ') === -1) {
    return res.status(400).json({
      message: '잘못된 요청입니다.'
    });
  }

  authorizationHeader = authorizationHeader.split('Bearer ')[1];
  var decodedToken = jwt.verify(authorizationHeader, JWT_SECRET);

  if (!decodedToken || !decodedToken.username) {
    return res.status(401).json({
      message: '권한이 없습니다.'
    });
  }

  if (!req.params.section_name || VALID_SECTIONS.indexOf(req.params.section_name) === -1) {
    return res.status(400).json({
      message: '잘못된 요청입니다.'
    });
  }

  request.get({
    url: `https://api.nytimes.com/svc/topstories/v2/${req.params.section_name}.json`,
    qs: {
      'api-key': "ddebb6e03d6f49648bdb0830ba37a061"
    },
  }, function(error, response, body) {
    if (error) {
      return res.status(500).json({
        message: '서버에 오류가 있었습니다.'
      });
    }

    body = JSON.parse(body);
    res.status(200).json(body);
  });
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
