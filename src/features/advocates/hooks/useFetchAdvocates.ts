import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { advocatesService } from "..";
import { Advocate, AdvocatesApiResponse } from "../types";

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
    refetch: () => void;
}

export const useFetchAdvocates = (): UseAdvocatesReturn => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const {
        data,
        isFetching,
        error,
        refetch,
    } = useQuery<AdvocatesApiResponse>({
        queryKey: ["advocates", page, pageSize, searchTerm],
        queryFn: () => advocatesService.getAdvocates(page, pageSize, searchTerm),
        placeholderData: keepPreviousData
    });

    const advocates: Advocate[] = data?.data || [];
    const total: number = data?.total || 0;

    const resetSearch = () => {
        setSearchTerm("");
        setPage(1);
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
        refetch
    };
};