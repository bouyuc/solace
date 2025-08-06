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

export interface AdvocatesResponse {
    data: Advocate[];
}

export interface AdvocateTableProps {
    advocates: Advocate[];
    loading?: boolean;
    pageSize?: number;
}