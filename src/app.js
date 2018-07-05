
require('style/main.scss');

// require('component/counterByDom.js');

// require('component/counterByRedux.js');

import {createStore,applyMiddleware,bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider,connect} from 'react-redux'

import counter from 'reducer';
import * as actionsCreators from 'actions';
import CounterPanel from 'component/counterPanel';

let initState = {
	A:[],
	B:[]
};

let store = createStore(counter,initState,applyMiddleware(thunk));

export default class App extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let {A,B,increment,decrement,addIfOdd,asyncAdd,addCounter} = this.props;
		return(
			<div>
				<CounterPanel 
					{...{
						data:A,
						actions:{increment,decrement,addIfOdd,asyncAdd,addCounter},
						name:"A"
					}}
				/>
				<CounterPanel
					{...{
						data:B,
						actions:{increment,decrement,addIfOdd,asyncAdd,addCounter},
						name:"B"
					}}
				/>
			</div>
		)
	}
}

App = connect(
	state =>store.getState(),
	dispatch => bindActionCreators(actionsCreators,dispatch)
)(App)

ReactDOM.render(
	<Provider
		store={store}
	>
		<App />
	</Provider>,
	document.getElementById("root")
);


