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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

/**
 * @ignore
 */
const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		margin: 'auto',
		width: '600px',
	},
	form: {
		zoom: '125%',
	},
	card: {
		margin: 'auto',
		width: '600px',
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
		marginTop: '3.5%',
	},
	wrapper: {
		margin: theme.spacing.unit,
		position: 'relative',
	},
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
		error: {
			color: 'red',
		},
	},
});

/**
 * @ignore
 */
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
		label: 'Logaritmo',
	},
];

/**
 * Contiene il form e i relativi metodi per controllarlo.
 * Effettua le richieste al server e stampa il risultato.
 */
class Form extends React.Component {
	/**
	 * Crea un Form, imposta il dominio dell'API e lo stato di default.
	 */
	constructor(props) {
		super(props);
		this.api = 'https://newton.now.sh/';
		this.state = { result: '', text: '', type: 'simplify', open: false, error: false, show: false };
	}

	/**
	 * Gestisce la chiusura dello SnackBar aggiornando lo stato a false.
	 *
	 * @param {object} event - L'evento che viene generato alla chiusura.
	 * @param {string} reason - Il motivo che ha scaturito la chiusura, come il click al di fuori della finestra.
	 */
	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ open: false });
	};

	/**
	 * Gestisce il click sul bottone ed esegui la richiesta all'API.
	 *
	 * @param {object} e - L'evento che viene generato al click.
	 */
	onButtonClick = (e) => {
		e.preventDefault();
		if (this.state.text === '') return this.setState({ open: true });

		let url = this.api + this.state.type + '/' + encodeURI(this.state.text);
		fetch(url)
			.then((res) => {
				if (!res.ok)
					throw new Error();

				return res.json();
			})
			.then((json) => {
				if (!json.result[0]) throw new Error();

				console.log('Risultato:', json.result);

				this.setState({
					result: json.result,
					error: false,
					show: true
				});
			})
			.catch((err) => {
				err.message = 'Operazione non valida';
				console.log('Errore:', err.message);

				this.setState({
					error: true,
					message: err.message,
					show: true
				});
			});
	};

	/**
	 * Gestisce il cambiamento del campo di testo dell'operazione, stampa il nuovo valore nella console ed aggiorna lo stato.
	 *
	 * @param {object} e - L'evento che viene generato ad ogni cambiamente del testo.
	 */
	onTextChange = (e) => {
		let editedText = e.target.value;
		console.log('Testo operazione:', editedText);
		this.setState({
			text: editedText,
		});
	};

	/**
	 * Gestisce il cambiamento dell'operazione selezionata, stampa il nuovo valore nella console ed aggiorna lo stato.
	 *
	 * @param {object} e - L'evento che viene generato al click.
	 */
	onTypeChange = (e) => {
		let editedType = e.target.value;
		console.log('Tipo operazione:', editedType);
		this.setState({
			type: editedType,
		});
	};

	/**
	 * Recupera le classi dalle proprietà iniettate.
	 * L'esito, sia positivo che negativo, viene visualizzato appena sotto al form.
	 * Nel caso in cui il campo di testo sia vuoto al momento dell'invio, viene visualizzato lo Snackbar che si chiuderà in automatico dopo 6 secondi.
	 * @returns {object} Un form che contiene un campo di testo, una lista ed un bottone per eseguire l'operazione, un typography che contiene l'esito ed uno Snackbar in caso di campo di testo vuoto.
	 */
	render() {
		const { classes } = this.props;

		return (
			<div className={ classes.container }>
				<form
					className={ classes.form }
					autoComplete="off"
					onSubmit={ this.onButtonClick }>
					<TextField
						id="outlined-name"
						label="Testo"
						className={ classes.textField }
						value={ this.state.text }
						onChange={ this.onTextChange }
						margin="normal"
						variant="outlined"
						required
					/>
					<TextField
						id="outlined-select-currency"
						select
						label="Operazione"
						className={ classes.textField }
						value={ this.state.type }
						onChange={ this.onTypeChange }
						SelectProps={ {
							MenuProps: {
								className: classes.menu,
							},
						} }
						helperText="Seleziona l'operazione"
						margin="normal"
						variant="outlined"
						required>
						{ operations.map((option) => (
							<MenuItem key={ option.value } value={ option.value }>
								{ option.label }
							</MenuItem>
						)) }
					</TextField>
					<Fab
						color="secondary"
						onClick={ this.onButtonClick }
						aria-label="Edit"
						className={ classes.fab }>
						<Icon>play_arrow</Icon>
					</Fab>
				</form>
				{ this.state.show && <Card className={ classes.card }>
					<CardContent>
						<Typography variant="h5" component="h2" className={this.state.error ? classes.error : ''}>
							{ !this.state.error
								? 'Risultato: ' + this.state.result
								: this.state.message }
						</Typography>
					</CardContent>
				</Card> }
				<Snackbar
					anchorOrigin={ {
						vertical: 'bottom',
						horizontal: 'left',
					} }
					open={ this.state.open }
					autoHideDuration={ 6000 }
					onClose={ this.handleClose }>
					<SnackbarContentWrapper
						onClose={ this.handleClose }
						message="Compilare tutti i campi"
					/>
				</Snackbar>
			</div>
		);
	}
}

Form.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
