import { AdvocatesApiResponse } from '../types';

export const advocatesService = {
    async getAdvocates(page = 1, limit = 10, search = ""): Promise<AdvocatesApiResponse> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...(search && { search }),
        });
        const response = await fetch(`/api/advocates?${params}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch advocates: ${response.statusText}`);
        }
        return response.json();
    }
};