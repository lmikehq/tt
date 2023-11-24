export interface ViewSingleStayRequestInput {
    id: string;
    checkin: string;
    checkout: string;
    residency: string;
    language: string;
    guests: [
        {
            adults: number;
            children: number;
        }
    ];
    currency: string;
}
