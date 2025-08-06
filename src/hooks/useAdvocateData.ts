import { useState, useEffect } from "react";
import { Advocate, AdvocatesResponse } from "../types";

interface UseAdvocateDataReturn {
    advocates: Advocate[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useAdvocateData = (): UseAdvocateDataReturn => {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAdvocates = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("fetching advocates...");

            const response = await fetch("/api/advocates");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonResponse: AdvocatesResponse = await response.json();
            setAdvocates(jsonResponse.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch advocates");
            console.error("Error fetching advocates:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvocates();
    }, []);

    const refetch = () => {
        fetchAdvocates();
    };

    return {
        advocates,
        loading,
        error,
        refetch,
    };
};
