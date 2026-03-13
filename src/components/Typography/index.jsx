const Typography = ({ variant, children, style }) => {
  const baseStyle = {
    fontFamily: 'helvetica, arial, sans-serif',
    color: '#333',
    ...style,
  };

  switch (variant) {
    case 'h1':
      return <h1 style={{ ...baseStyle, fontSize: '2rem', fontWeight: 'bold' }}>{children}</h1>;
    case 'h2':
      return <h2 style={{ ...baseStyle, fontSize: '1.5rem', fontWeight: 'bold' }}>{children}</h2>;
    case 'body':
    default:
      return <p style={{ ...baseStyle, fontSize: '0.625rem' }}>{children}</p>;
  }
};

export default Typography;
