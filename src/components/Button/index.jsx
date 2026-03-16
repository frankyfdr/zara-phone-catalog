import Typography from '../Typography';
import './Button.scss';

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  return (
    <button type="button" className={`button ${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
export default Button;
