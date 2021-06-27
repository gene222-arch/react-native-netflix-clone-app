import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar'
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
					<StatusBar style='light' backgroundColor='transparent'/>
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
}

export default App
