import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

/**
 * @ignore
 */
const styles = (theme) => ({
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});

/**
 * Contiene lo SnackbarContentWrapper che è una sorta di contenitore per ciò che si troverà dentro lo Snackbar padre.
 */
class SnackbarContentWrapper extends React.Component {
	/**
	 * Recupera dalle proprietà le classi iniettate, il messaggio e la funzione per chiudere lo Snackbar padre.
	 * @returns {object} Uno SnackbarContent che contiene il messaggio ed un pulsante di chiusura.
	 */
	render() {
		const { classes, className, message, onClose } = this.props;
		const Icon = ErrorIcon;

		return (
			<SnackbarContent
				className={classNames(classes.error, className)}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Icon
							className={classNames(
								classes.icon,
								classes.iconVariant
							)}
						/>
						{message}
					</span>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={onClose}>
						<CloseIcon className={classes.icon} />
					</IconButton>,
				]}
			/>
		);
	}
}

SnackbarContentWrapper.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
};

export default withStyles(styles)(SnackbarContentWrapper);
