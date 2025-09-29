
export interface Event {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    start_time: Date;
    end_time: Date;
    location?: string;
    is_all_day: boolean;
    recurrence_rule?: string;
    created_at: Date;
    updated_at: Date;
}