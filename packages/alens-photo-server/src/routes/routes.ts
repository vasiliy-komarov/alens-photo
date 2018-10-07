import express, {Express} from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import log from '../utils/log';

export default (app: Express): void => {

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  //app.use(bodyParser({ keepExtensions: true, uploadDir: __dirname + '../public/uploads' }));

  app.use(morgan('dev'));

  app.use('/', express.static(path.join(path.dirname(__dirname) + '/web-app/dist')));

  app.get('/api', (req, res, next) => {
    res.json({"data": "sosi"});
  });

//    app.get('/', (req, res, next) => {
//
//        // LOG.info(`basedir ${path.basename()}`);
//
//         LOG.info(path.join(`${__dirname}../web-app/dist/index.html`));
//        // res.sendFile(path.join(`${__dirname}../../../web-app/dist/index.html`));
//        // let t = 'test';
//        res.json({});
//    });


  // app.all('/stats/*', (req, res, next) => {
  //     next();
  // });
  //
  // app.get('/test', isLocal, (req, res) => {
  //     try {
  //         let playerId = req.params.playerid;
  //         let serverId = req.params.serverid;
  //
  //         if (_.isEmpty(playerId) || _.isEmpty(serverId)) {
  //             res.json({
  //                 error: `Wrong parameters, playerId = ${playerId}, serverId = ${serverId}`
  //             });
  //         }
  //
  //         statsController.getStats(playerId, serverId, data => {
  //             res.json(data);
  //         });
  //     } catch (e) {
  //         LOG.error('Something wrong e = ', e);
  //         res.json({
  //             error: e
  //         })
  //     }
  // });
  //
  // app.post('/stats/updatestats/:playerid/:serverid', isLocal, (req, res) => {
  //     let playerId = req.params.playerid;
  //     let serverId = req.params.serverid;
  //
  //     if (_.isEmpty(playerId) || _.isEmpty(serverId)) {
  //         res.json({
  //             error: `Wrong parameters, playerId = ${playerId}, serverId = ${serverId}`
  //         });
  //     }
  //
  //     statsController.updateStats(playerId, serverId, req.body);
  //
  //     res.end();
  // });
  //
  // app.get('/stats/getweaponstats/:playerid/:serverid', isLocal, (req, res) => {
  //     let playerId = req.params.playerid;
  //     let serverId = req.params.serverid;
  //
  //     if (_.isEmpty(playerId) || _.isEmpty(serverId)) {
  //         res.json({
  //             error: `Wrong parameters, playerId = ${playerId}, serverId = ${serverId}`
  //         });
  //     }
  //
  //     weaponController.getStats(playerId, serverId, data => res.json(data));
  // });
  //
  // app.post('/stats/updateweaponstats/:playerid/:serverid', isLocal, (req, res) => {
  //     let playerId = req.params.playerid;
  //     let serverId = req.params.serverid;
  //
  // console.log(JSON.stringify(req.body, 0, 2));
  //
  //     if (_.isEmpty(playerId) || _.isEmpty(serverId)) {
  //         res.json({
  //             error: `Wrong parameters, playerId = ${playerId}, serverId = ${serverId}`
  //         });
  //     }
  //     weaponController.updateStats(playerId, serverId, req.body);
  //
  //     res.end();
  // });

  function isLocal(req, res, next) {
    if (app.get('env') === 'dev') {
      return next();
    } else {
      let remote = req.ip || req.connection.remoteAddress;
      if (remote === '::1' || remote === 'localhost' || remote === '::ffff:127.0.0.1') {
        return next();
      } else {
        return next('route'); //call next /test route to handle check on authentication.
      }
    }
  }

  app.use(function (req, res) {
    res.status(404).send(`Woops! Requst ${req.url} not found, sorry!`);
  });

  app.use(function (err, req, res, next) {
    if (app.get('env') === 'dev') {
      app.use(errorHandler());
    } else {
      res.send(500);
    }
  });


  //var file = req.params.file;
  //var img = fs.readFileSync(__dirname + "../public/uploads/" + file);
  //res.writeHead(200, {'Content-Type': 'image/jpg' });
  //res.end(img, 'binary');

};
