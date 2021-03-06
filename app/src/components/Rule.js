import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

/**
 * Contiene Rule, la finestra di dialogo che appare quando si clicca sul bottone 'regole' nella app bar. E' composto da una lista di 3 elementi.
 */
class Rule extends React.Component {
	/**
	 * Recupera dalle proprietà le funzioni che gestiscono l'apertura e la chiusura del Dialog.
	 * Se si clicca all'infuori di esso, viene generato un evento per la chiusura.
	 * @returns {object} Un Dialog con un titolo, una lista di 3 regole ed un bottone per chiuderlo.
	 */
	render() {
		const { onOpen, onClose } = this.props;

		return (
			<Dialog
				open={onOpen}
				onClose={onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{'Regole'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<List dense={false}>
							<ListItem>
								<ListItemText primary="Per trovare la retta tangente ad una funzione in un determinato valore x, invia la richiesta come c|f(x) dove c è il valore x dato ed f(x) è l'espressione della funzione, il separatore è una barra verticale '|'." />
							</ListItem>
							<ListItem>
								<ListItemText primary="Per trovare l'area sotto una funzione, invia la richiesta come c:d|f(x) dove c è il valore di x iniziale, d è il valore di x finale e f(x) è la funzione di cui vuoi conoscere l'area fra i 2 valori di x." />
							</ListItem>
							<ListItem>
								<ListItemText primary="Per calcolare le frazioni, inserisci espressioni come denominatore(over)numeratore. Ad esempio, per elaborare 2/4 devi inviare la tua espressione come 2(over)4. L'espressione del risultato sarà nella notazione matematica standard (1/2, 3/4)." />
							</ListItem>
							<ListItem>
								<ListItemText primary="Per calcolare seno, coseno, tangente e rispettive operazioni inverse utilizzare i radianti. Il pi greco va espresso come 'pi'" />
							</ListItem>
						</List>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose} color="primary">
						Chiudi
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default Rule;
