import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './Router';
import { Provider } from 'react-redux';

// import { PersistGate } from 'redux-persist/integration/react';

class App extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	render() {
		console.log('props', this.props);
		const { store, persistor } = this.props;
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;


{/* <Provider store={store}>
	<PersistGate loading={null} persistor={persistor}>
		{ this.content }
	</PersistGate>
</Provider> */}