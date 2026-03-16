const Typography = ({ variant = 'body', children, style = {}, className = '' }) => {
  const baseStyle = {
    fontFamily: 'helvetica, arial, sans-serif',
    color: '#333',
    ...style,
  };

  switch (variant) {
    case 'h1':
      return (
        <h1 className={className} style={{ ...baseStyle, fontSize: '2rem', fontWeight: 'bold' }}>
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 className={className} style={{ ...baseStyle, fontSize: '1.5rem', fontWeight: 'bold' }}>
          {children}
        </h2>
      );
    case 'label':
      return (
        <span className={className} style={{ ...baseStyle, fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.05em' }}>
          {children}
        </span>
      );
    case 'body':
    default:
      return (
        <p className={className} style={{ ...baseStyle, fontSize: '0.625rem', margin: 0 }}>
          {children}
        </p>
      );
  }
};

export default Typography;
