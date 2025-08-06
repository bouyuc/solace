import { useState, useMemo } from "react";
import { Advocate } from "../types";

interface UseAdvocateSearchReturn {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    resetSearch: () => void;
    filterAdvocates: (advocates: Advocate[]) => Advocate[];
}

export const useAdvocateSearch = (): UseAdvocateSearchReturn => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filterAdvocates = useMemo(() => {
        return (advocates: Advocate[]) => {
            if (!searchTerm) return advocates;

            const searchLower = searchTerm.toLowerCase();
            return advocates.filter((advocate: Advocate) => {
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
        };
    }, [searchTerm]);

    const resetSearch = () => {
        setSearchTerm("");
    };

    return {
        searchTerm,
        setSearchTerm,
        resetSearch,
        filterAdvocates,
    };
};
