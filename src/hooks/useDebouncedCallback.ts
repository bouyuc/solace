import { useCallback, useEffect, useRef } from 'react';

/**
 * Creates a debounced version of a callback function
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds
 * @returns A tuple containing the debounced callback and a cancel function
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): [T, () => void] {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const callbackRef = useRef(callback);

    // Keep callback reference fresh
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }, []);

    const debouncedCallback = useCallback(
        ((...args: Parameters<T>) => {
            cancel();
            timeoutRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delay);
        }) as T,
        [delay, cancel]
    );

    // Cleanup on unmount
    useEffect(() => {
        return cancel;
    }, [cancel]);

    return [debouncedCallback, cancel];
}
