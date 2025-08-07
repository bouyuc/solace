export interface Advocate {
    id?: number;
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: string;
}

export interface AdvocatesApiResponse {
    data: Advocate[];
    page: number;
    limit: number;
    total: number;
}

export interface AdvocateTableProps {
    advocates: Advocate[];
    loading?: boolean;
    pageSize?: number;
    page?: number;
    total?: number;
    onChangePage?: (page: number) => void;
    onChangePageSize?: (size: number) => void;
}