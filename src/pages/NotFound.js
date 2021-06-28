import { useHistory } from 'react-router-dom';

import Dialog from '../components/Dialog.js';

const NotFoundPage = () => {
	const history = useHistory();

	const browseHandler = () => {
		history.push('/');
	}

	return (
		<section className="app__page-section">
			<h1 className="app__page-title">Oops!</h1>
			<Dialog
				className="error"
				title="Error 404"
				subtitle="Page not found :/"
				label="Go back!"
				onClick={browseHandler}
			/>
		</section>
	);
}

export default NotFoundPage;
