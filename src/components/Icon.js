import * as FontAwesome from 'react-icons/fa';

const Icon = (props) => {
	const IconName = FontAwesome[props.icon];
	return <IconName aria-label={props.ariaLabel} className={props.className} />;
}

export default Icon;
