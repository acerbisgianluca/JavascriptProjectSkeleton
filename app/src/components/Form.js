import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from './SnackbarContentWrapper';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

/**
 * Endpoint: https://github.com/aunyks/newton-api#view-available-endpoints
 */

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	dense: {
		marginTop: 16,
	},
	menu: {
		width: 200,
	},
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
	margin: {
		margin: theme.spacing.unit,
	},
	fab: {
		margin: theme.spacing.unit,
	},
	fabProgress: {
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1,
	},
	wrapper: {
		margin: theme.spacing.unit,
		position: 'relative'
	},
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none'
	}
});

const operations = [
	{
		value: 'simplify',
		label: 'Semplificazione',
	},
	{
		value: 'factor',
		label: 'Fattori',
	},
	{
		value: 'zeroes',
		label: 'Trova gli zeri',
	},
	{
		value: 'tangent',
		label: 'Trova la tangente',
	},
	{
		value: 'derive',
		label: 'Derivata',
	},
	{
		value: 'integrate',
		label: 'Integrale',
	},
	{
		value: 'area',
		label: 'Area sotto una curva',
	},
	{
		value: 'sin',
		label: 'Seno',
	},
	{
		value: 'cos',
		label: 'Coseno',
	},
	{
		value: 'tan',
		label: 'Tangente',
	},
	{
		value: 'arcsin',
		label: 'Inverso del seno',
	},
	{
		value: 'arccos',
		label: 'Inverso del coseno',
	},
	{
		value: 'arctan',
		label: 'Inverso della tangente',
	},
	{
		value: 'abs',
		label: 'Valore assoluto',
	},
	{
		value: 'log',
		label: 'Logaritmo'
	}
];

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.api = "https://newton.now.sh/";
		this.state = { result: '', text: '', type: 'simplify', open: false };
	}

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ open: false });
	};

	onButtonClick = e => {
		e.preventDefault();
		if (this.state.text === '')
			return this.setState({ open: true });
		// prendo il tipo e l'operazione e faccio la fetch
		let url = this.api + this.state.type + '/' + encodeURI(this.state.text);
		fetch(url)
			.then(res => res.json())
			.then(json => {
				console.log("Risultato:", json.result);

				this.setState({
					result: json.result
				});
			});
	}

	onTextChange = e => {
		// salvo nello state il contenuto della casella di testo
		let editedText = e.target.value;
		console.log('Testo operazione:', editedText);
		this.setState(prevState => ({
			...prevState,
			text: editedText
		}));
	}

	onTypeChange = e => {
		// salvo nello state l'operazione selezionata
		let editedType = e.target.value;
		console.log('Tipo operazione:', editedType);
		this.setState(prevState => ({
			...prevState,
			type: editedType
		}));
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={this.state.open}
					autoHideDuration={6000}
					onClose={this.handleClose}
				>
					<SnackbarContentWrapper
						onClose={this.handleClose}
						variant="error"
						message="Compilare tutti i campi"
					/>
				</Snackbar>
				<form className={classes.container} autoComplete="off">
					<TextField
						id="outlined-name"
						label="Testo"
						className={classes.textField}
						value={this.state.text}
						onChange={this.onTextChange}
						margin="normal"
						variant="outlined"
						required
					/>
					<TextField
						id="outlined-select-currency"
						select
						label="Operazione"
						className={classes.textField}
						value={this.state.type}
						onChange={this.onTypeChange}
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Seleziona l'operazione"
						margin="normal"
						variant="outlined"
						required
					>
						{operations.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
					<Fab color="secondary" onClick={this.onButtonClick} aria-label="Edit" className={classes.fab}>
						<Icon>play_arrow</Icon>
					</Fab>
				</form>
				<Typography variant="h6" gutterBottom>
					{this.state.result && ("Risultato: " + this.state.result)}
      			</Typography>
			</div>
		);
	}
}

Form.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
