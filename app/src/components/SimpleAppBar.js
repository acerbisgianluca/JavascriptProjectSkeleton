import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rule from './Rule';

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	}
};

class SimpleAppBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							MatematicApp
          				</Typography>
						<Button color="inherit" onClick={this.handleClickOpen}>Regole</Button>
					</Toolbar>
				</AppBar>

				<Rule onOpen={this.state.open} onClose={this.handleClose}></Rule>
			</div>
		);
	}
}

SimpleAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);