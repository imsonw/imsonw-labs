import React from 'react';
import { fieldStyle } from './formFieldStyle';

export default function TextArea({ className = '', style, ...props }) {
  return <textarea className={className} style={{ ...fieldStyle, resize: 'none', ...style }} {...props} />;
}
