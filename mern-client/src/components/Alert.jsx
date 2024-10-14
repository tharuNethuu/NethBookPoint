import React from 'react'

const Alert = ({ message, variant, onClose }) => {
    const alertStyles = {
        padding: '1em',
        margin: '1em 0',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        backgroundColor: {
          success: '#28a745',
          danger: '#dc3545',
          warning: '#964B00',
          info: '#17a2b8',
        }[variant],
      };
    
      return (
        <div style={alertStyles}>
          <span>{message}</span>
          <button onClick={onClose} style={{ marginLeft: '1em', background: 'none', border: 'none', color: '#fff' }}>x</button>
        </div>
      );
    };

export default Alert
