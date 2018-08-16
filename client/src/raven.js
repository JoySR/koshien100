import Raven from 'raven-js';
import {version} from '../package.json';

const DSN = 'https://4ef9c9a43ec14aa481ffec778c31643b@sentry.io/1263299';

Raven.config(DSN, {
  release: version,
  environment: process.env.NODE_ENV,
}).install();

window.Raven = Raven;
