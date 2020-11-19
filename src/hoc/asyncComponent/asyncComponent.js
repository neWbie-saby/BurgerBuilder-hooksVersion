import React, { Component } from 'react';

const asynComponent = importedCompo => {
	return class extends Component {
		state = {
			component: null
		}
	
		componentDidMount () {
			importedCompo()
				.then(cmp => {
					this.setState({component: cmp.default});
			});
		}
		
		render () {
			const Co = this.state.component;
			
			return Co ? <Co {...this.props} /> : null;
		}
	}
}

export default asynComponent;