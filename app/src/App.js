import React from 'react';
import SimpleAppBar from './components/SimpleAppBar';
import Form from './components/Form';

/**
 * App è la classe principale che contiene soltanto 2 componenti.
 */
class App extends React.Component {
	/**
	 * @returns {object} Un div che contiene SimpleAppBar e Form.
	 */
	render() {
		return (
			<div>
				<SimpleAppBar />
				<Form />
			</div>
		);
	}
}

export default App;
