import { useState, useEffect, useMemo } from "react";
import { Advocate } from "../types";

interface UseAdvocatesReturn {
    advocates: Advocate[];
    filteredAdvocates: Advocate[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    resetSearch: () => void;
}

export const useAdvocates = (): UseAdvocatesReturn => {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch advocates data
    useEffect(() => {
        const fetchAdvocates = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log("fetching advocates...");

                const response = await fetch("/api/advocates");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonResponse = await response.json();
                setAdvocates(jsonResponse.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch advocates");
                console.error("Error fetching advocates:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvocates();
    }, []);

    // Filter advocates based on search term
    const filteredAdvocates = useMemo(() => {
        if (!searchTerm) return advocates;

        console.log("filtering advocates...");
        return advocates.filter((advocate: Advocate) => {
            const searchLower = searchTerm.toLowerCase();
            return (
                advocate.firstName.toLowerCase().includes(searchLower) ||
                advocate.lastName.toLowerCase().includes(searchLower) ||
                advocate.city.toLowerCase().includes(searchLower) ||
                advocate.degree.toLowerCase().includes(searchLower) ||
                advocate.specialties.some((specialty) =>
                    specialty.toLowerCase().includes(searchLower)
                ) ||
                advocate.yearsOfExperience.toString().includes(searchTerm) ||
                advocate.phoneNumber.toString().includes(searchTerm)
            );
        });
    }, [advocates, searchTerm]);

    const resetSearch = () => {
        console.log("resetting search...");
        setSearchTerm("");
    };

    return {
        advocates,
        filteredAdvocates,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        resetSearch,
    };
};
