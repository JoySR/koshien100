import http from 'http';
import Router from 'node-router';
const router = Router();
const route = router.push;
import bodyParser from 'body-parser';
import Raven from 'raven';

const DSN = 'https://2e636f01b96f4682a2de434736ef8627@sentry.io/1263501';
Raven.config(DSN).install();

global.Raven = Raven;

import BasicHandler from './handlers/basic';
import Areas from './handlers/areas';
import Dates from './handlers/dates';
import Users from './handlers/users';
import Prefectures from './handlers/prefectures';
import Games from './handlers/games';
import Schools from './handlers/schools';

route('*', BasicHandler.headerHandler);
route('OPTIONS', BasicHandler.optionsHandler);

route('POST', 'PUT', 'DELETE', bodyParser.urlencoded({extended: false}));
route('POST', 'PUT', 'DELETE', bodyParser.json());

route('GET', '/', BasicHandler.rootHandler);

route('POST', '/register', Users.register);
route('POST', '/login', Users.login);
route('POST', '/logout', Users.logout);

route('GET', '/dates', Dates.getDates);
route('POST', '/date', Dates.addDate);
route('PUT', '/date', Dates.editDate);
route('DELETE', '/date', Dates.removeDate);

route('GET', '/areas', Areas.getAreas);
route('POST', '/area', Areas.addArea);
route('PUT', '/area', Areas.editArea);
route('DELETE', '/area', Areas.removeArea);

route('GET', '/prefectures', Prefectures.getPrefectures);
route('POST', '/prefecture', Prefectures.addPrefecture);
route('PUT', '/prefecture', Prefectures.editPrefecture);
route('DELETE', '/prefecture', Prefectures.removePrefecture);

route('GET', '/games', Games.getGames);
route('POST', '/game', Games.addGame);
route('PUT', '/game', Games.editGame);
route('DELETE', '/game', Games.removeGame);

route('GET', '/schools', Schools.getSchools);
route('POST', '/school', Schools.addSchool);
route('PUT', '/school', Schools.editSchool);
route('DELETE', '/school', Schools.removeSchool);

route(BasicHandler.notFoundHandler);
route(BasicHandler.errorHandler);

const server = http.createServer(router).listen(2039);
console.log('node server is listening on http://127.0.0.1:2039');
