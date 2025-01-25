import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootComponent from './RootComponent';
import { persistor, store } from './store/reducers/store';
import { Toaster } from '@/components/ui/toaster';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
        <Toaster />
      </PersistGate>
    </Provider>
  );
};

export default App;
