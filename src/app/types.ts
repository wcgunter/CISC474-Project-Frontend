export interface ApiResponse {
    status: string;
    data: any;
    result?:any;
}

export interface Log {
    clock_in_date_time: string;
    clock_out_date_time: string;
    clock_id: string;
}