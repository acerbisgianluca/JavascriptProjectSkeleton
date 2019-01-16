import React from 'react';
import SimpleAppBar from './components/SimpleAppBar';
import Form from './components/Form';

/**
 * Endpoint: https://github.com/aunyks/newton-api#view-available-endpoints
 */

class App extends React.Component {

	render() {
		return (
			<div>
				<SimpleAppBar></SimpleAppBar>
				<Form></Form>
			</div>
		);
	}
}

export default App;
