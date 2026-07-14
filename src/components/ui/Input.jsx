import React from 'react';
import { fieldStyle } from './formFieldStyle';

export default function Input({ icon, className = '', style, ...props }) {
  if (icon) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <span style={{
          position: 'absolute',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
        }}>
          {icon}
        </span>
        <input className={className} style={{ ...fieldStyle, paddingLeft: '2.75rem', ...style }} {...props} />
      </div>
    );
  }
  return <input className={className} style={{ ...fieldStyle, ...style }} {...props} />;
}
