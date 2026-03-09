import { useEffect, useMemo, useState } from "react";

export function usePersistedState(key: string, initial: string) {
  const initialValue = useMemo(() => {
    try {
      return localStorage.getItem(key) ?? initial;
    } catch {
      return initial;
    }
  }, [key, initial]);

  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}