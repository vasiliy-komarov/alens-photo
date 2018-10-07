import winston from 'winston';

export default new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: "level",
      prettyPrint: true,
      timestamp: true,
      showLevel: true
    }),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({
      filename: 'application.log'
    })
  ]
});
