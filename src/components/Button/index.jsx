import Typography from '../Typography';
import './Button.scss';

const Button = ({ label, onClick, variant = 'primary', disabled = false, ...props }) => {
  return (
    <button type="button" className={`button ${variant}`} onClick={onClick} disabled={disabled} {...props}>
      <Typography variant="body" style={{ margin: 0, color: 'inherit', fontSize: '0.82rem', fontWeight: 'bold' }}>
        {label}
      </Typography>
    </button>
  );
};
export default Button;
