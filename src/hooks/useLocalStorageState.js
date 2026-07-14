import { useState } from 'react';

export function useLocalStorageState(key, defaultValue, { validate } = {}) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return validate ? validate(saved, defaultValue) : (saved ?? defaultValue);
  });

  const set = (nextValue) => {
    setValue((prev) => {
      const next = typeof nextValue === 'function' ? nextValue(prev) : nextValue;
      localStorage.setItem(key, next);
      return next;
    });
  };

  return [value, set];
}
