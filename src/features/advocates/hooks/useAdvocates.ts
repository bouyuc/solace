import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Advocate } from "..";

interface AdvocatesApiResponse {
    data: Advocate[];
    page: number;
    limit: number;
    total: number;
}

interface UseAdvocatesReturn {
    advocates: Advocate[];
    isFetching: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    resetSearch: () => void;
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (size: number) => void;
    total: number;
}


export const useAdvocates = (): UseAdvocatesReturn => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const {
        data,
        isFetching,
        error,
    } = useQuery<AdvocatesApiResponse>({
        queryKey: ["advocates", page, pageSize, searchTerm],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: pageSize.toString(),
                ...(searchTerm && { search: searchTerm })
            });
            const response = await fetch(`/api/advocates?${params}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        },
        placeholderData: keepPreviousData
    });

    const advocates: Advocate[] = data?.data || [];
    const total: number = data?.total || 0;

    const resetSearch = () => {
        setSearchTerm("");
        setPage(1); // Reset to first page when clearing search
    };

    return {
        advocates,
        isFetching,
        error: error ? (error as Error).message : null,
        searchTerm,
        setSearchTerm,
        resetSearch,
        page,
        setPage,
        pageSize,
        setPageSize,
        total,
    };
};
