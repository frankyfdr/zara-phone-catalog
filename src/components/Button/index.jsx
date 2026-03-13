import Typography from '../Typography';

const Button = ({ label, onClick, variant = 'primary', disabled = false }) => {
  return (
    <button
      type="button"
      style={{
        padding: '1rem 2rem',
        border: variant === 'secondary' ? '1px solid #000' : 'none',
        background: variant === 'secondary' ? 'transparent' : '#000',
        color: variant === 'secondary' ? '#333' : '#fff',
        width: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
export default Button;
