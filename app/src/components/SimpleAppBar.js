import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Rule from './Rule';

/**
 * @ignore
 */
const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
};

/**
 * Contiene l'app bar, il bottone per mostrare il componente Rule e i relativi metodi di controllo.
 */
class SimpleAppBar extends React.Component {
	/**
	 * Crea una SimpleBar ed imposta lo stato di default.
	 */
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	/**
	 * Gestisce l'apertura del componente Rule al click del bottone aggiornando 'open' a true.
	 */
	handleClickOpen = () => {
		this.setState({ open: true });
	};

	/**
	 * Gestisce la chiusura del componente Rule al click sul bottone 'chiudi' o su di una parte dello schermo aggiornando 'open' a false.
	 */
	handleClose = () => {
		this.setState({ open: false });
	};

	/**
	 * Recupera le classi dalle proprietà iniettate.
	 * @returns {object} L'AppBar con un typography che contiene il nome dell'app e un bottone per aprire il componente delle regole.
	 */
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Toolbar>
						<Typography
							variant="h6"
							color="inherit"
							className={classes.grow}>
							MatematicApp
						</Typography>
						<Button color="inherit" onClick={this.handleClickOpen}>
							Regole
						</Button>
					</Toolbar>
				</AppBar>

				<Rule onOpen={this.state.open} onClose={this.handleClose} />
			</div>
		);
	}
}

SimpleAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);
