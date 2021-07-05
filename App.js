import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/redux/store';
import Navigation from './app/navigation/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const { persistor, store } = configureStore();


const App = () => 
{
	return (
		<Provider store={ store }>
			<PersistGate 
				loading={ <ActivityIndicator /> } 
				persistor={ persistor }
			>
				<SafeAreaProvider>
					<Navigation />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
}

export default App
