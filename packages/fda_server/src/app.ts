import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import lusca from 'lusca';
import errorHandler from 'errorhandler';
import api from './routes';

import { CLIENT_URL, PORT, SESSION_SECRET, MONGO_URL } from './config';
import { accessLogStream, connectDatabase, multerConfig } from './configs';
import { ENVIRONMENT } from './utils/secrets';
import { ENV } from './constants';

// connectDatabase();

const app = express();

app.set('port', PORT || 5000);

app.use(helmet());
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000, // just compress when data is over 100kB
    filter: (req: Request, res: Response) => {
      if (req.headers['x-no-compress']) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   session({
//     resave: true,
//     saveUninitialized: true,
//     secret: SESSION_SECRET as string,
//     store: new MongoStore({
//       mongoUrl: MONGO_URL,
//     }),
//   })
// );
// app.use(lusca.csrf());
// app.use(lusca.xframe('SAMEORIGIN'));
// app.use(lusca.xssProtection(true));
app.use(morgan('combined', { stream: accessLogStream }));
app.use(multer(multerConfig.options).fields(multerConfig.fields));

app.use('/api', api);

if (ENVIRONMENT === ENV.DEV) {
  app.use(cors({ origin: CLIENT_URL }));
  app.use(errorHandler());
}

export default app;
