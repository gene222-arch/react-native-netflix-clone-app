import React from 'react';
import { ActivityIndicator, StyleSheet, StatusBar, Platform, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './app/redux/store';
import Navigation from './app/navigation/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const { persistor, store } = configureStore();

const App = () => 
{
	const colorScheme = useColorScheme();

	const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

	return (
		<Provider store={ store }>
			<PersistGate 
				loading={ <ActivityIndicator /> } 
				persistor={ persistor }
			>
				<SafeAreaProvider style={ [styles.root, themeContainerStyle] }>
					<Navigation />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	root: {
	},
	lightContainer: {
	  	backgroundColor: '#d0d0c0',
		color: '#242c40',
	},
	darkContainer: {
	  	backgroundColor: '#242c40',
		color: '#d0d0c0',
	}
  });

export default App
