import Icon from './Icon.js';

const Button = ({ icon, ...props }) => {
	return (
		<button 
			aria-labelledby={props.label ? props.ariaLabelledBy : null} 
			aria-label={props.label ? null : props.ariaLabel} 
			className={`btn ${props.className}`} 
			onClick={props.onClick}
		>
			{icon && <Icon icon={icon} className={`${props.className}--icon`} />}
			{props.label}
		</button>
	);
}

export default Button;
