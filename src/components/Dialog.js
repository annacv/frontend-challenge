import Icon from './Icon';
import Button from './Button';

const Dialog = (props) => {
	return (
		<div className="dialog">
			<div className="dialog__head">
				<Icon ariaLabel="Kiwi bird icon" icon="FaKiwiBird" className={`dialog__head-icon dialog__head-icon--${props.className}`} />
				<h2 className="dialog__head-title"> {props.title}</h2>
			</div>
			<div className="dialog__actions">
				<h3 className="dialog__subtitle">{props.subtitle}</h3>
				{(props.icon || props.label) && <Button ariaLabelledBy={`${props.label} button`} label={props.label} icon={props.icon} className="btn__default" onClick={props.onClick} />}
			</div>
		</div>
	);
}

export default Dialog;
