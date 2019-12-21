import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/configure';
import initLocale from '@services/locale';
// import errorLog from '@services/errorLog';

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);

const bootstrap = async () => {
  // await errorLog();
  await initLocale();
  render(<Root />, document.getElementById('root'));
};

bootstrap();