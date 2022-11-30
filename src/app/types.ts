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

export interface LogView {
    position: number;
    clockIn: string;
    clockOut: string;
    hoursWorked: number;
    pay: number;
}

export interface PayResult {
    hours_worked: number;
    pay: number;
}