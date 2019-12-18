import React, { Component } from 'react';
import './App.css';
import Router from './Router';
import { Provider } from 'react-redux';

class App extends Component {
	render() {
		// console.log('props', this.props);
		const { store } = this.props;
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default App;
