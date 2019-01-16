import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Rule extends React.Component {

	render() {
		return (
			<Dialog
				open={this.props.onOpen}
				onClose={this.props.onClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Regole'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Keep in mind: To find the tangent line of a function at a certain x value, send the request as c|f(x) where c is the given x value and f(x) is the function expression, the separator is a vertical bar '|'. See the table above for an example request.
						<br />
						To find the area under a function, send the request as c:d|f(x) where c is the starting x value, d is the ending x value, and f(x) is the function under which you want the curve between the two x values.
						<br />
						To compute fractions, enter expressions as numerator(over)denominator. For example, to process 2/4 you must send in your expression as 2(over)4. The result expression will be in standard math notation (1/2, 3/4).
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