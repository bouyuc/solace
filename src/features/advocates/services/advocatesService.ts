import { AdvocatesResponse } from '../types';

export const advocatesService = {
    async getAdvocates(): Promise<AdvocatesResponse> {
        const response = await fetch("/api/advocates");

        if (!response.ok) {
            throw new Error(`Failed to fetch advocates: ${response.statusText}`);
        }

        return response.json();
    }
};