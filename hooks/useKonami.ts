import { useEffect, useState, useCallback } from 'react';

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export const useKonami = (callback: () => void): void => {
  const [keys, setKeys] = useState<string[]>([]);

  const keydownHandler = useCallback((e: KeyboardEvent) => {
    setKeys(currentKeys => {
      const newKeys = [...currentKeys, e.key];
      // Keep only the last N keys, where N is the length of the Konami code
      const slicedKeys = newKeys.slice(-konamiCode.length);
      
      if (JSON.stringify(slicedKeys) === JSON.stringify(konamiCode)) {
        callback();
        // Reset after successful entry
        return [];
      }
      return slicedKeys;
    });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandler);
    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [keydownHandler]);
};
