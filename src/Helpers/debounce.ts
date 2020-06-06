import React, { useState, useEffect } from 'react';

export default function useDebounce (value: string, delay: number) : any {
    const [debouncedValue, setDebounceValue] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value])

    return debouncedValue;
}

