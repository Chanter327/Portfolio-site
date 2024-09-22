import { createClient, RealtimeChannel } from '@supabase/supabase-js';

interface Event {
    id: number;
    year: number;
    month: number;
    day: number;
    wday: string;
    starttimeH: number;
    starttimeM: number;
    endtimeH: number;
    endtimeM: number;
    isWholeDay: boolean;
    title: string;
    description: string;
}

// イベント操作用配列
const year: number = new Date().getFullYear();
export const yearArray: number[] = [
    year - 3,
    year - 2,
    year - 1,
    year,
    year + 1,
    year + 2,
    year + 3
];
export const monthArray: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
export const dayArray: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

export const hourArray: number[] = Array.from({ length: 24 }, (_, i) => i + 0);
export const minutesArray: number[] = Array.from({ length: 12 }, (_, i) => i * 5 + 0);

export const timeValidation = (startH: number | null, startM: number | null, endH: number | null, endM: number | null): boolean => {
    if (startH == null || startM == null || endH == null || endM == null) {
        return false;
    } else if (startH === endH) {
        if (startM > endM) {
            return false
        } 
    } else if (startH !== endH) {
        if (startH > endH) {
            return false;
        }
    }
    return true;
}

// カレンダーを作成
export const wdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
};
const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
};

export const generateCalendar = (year: number, month: number) => {
    const wdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    const days: Array<{ year: number; month: number; day: number | null; isCurrentMonth: boolean; wday: string }> = [];

    const prevMonthDays = getDaysInMonth(year, month - 1);
    for (let i = 0; i < firstDay; i++) {
        const prevDay = prevMonthDays - firstDay + i + 1;
        const weekday = wdays[(firstDay - (i + 1) + 7) % 7];
        days.push({ year: month === 0 ? year - 1 : year, month: month === 0 ? 12 : month, day: prevDay, isCurrentMonth: false, wday: weekday });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const weekday = wdays[(firstDay + (i - 1)) % 7];
        days.push({ year: year, month: month + 1, day: i, isCurrentMonth: true, wday: weekday });
    }

    const nextMonthDaysCount = 42 - days.length;
    for (let i = 1; i <= nextMonthDaysCount; i++) {
        const weekday = wdays[(firstDay + daysInMonth + (i - 1)) % 7];
        days.push({ year: month === 11 ? year + 1 : year, month: month === 11 ? 1 : month + 2, day: i, isCurrentMonth: false, wday: weekday });
    }

    const isCurrentMonthForDay36 = days[35]?.isCurrentMonth ?? false;
    if (!isCurrentMonthForDay36) {
        days.splice(35);
    }

    return days;
};

// supabase initializing
const dbUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const dbKey : string = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
export const supabase = createClient(dbUrl, dbKey);

// supabase fetch
export const getCalendarData = async (): Promise<Event[]> => {
    const { data, error } = await supabase.from('calendar').select('*');
    
    if (error) throw error;
    return data as Event[];
}

// supabase fetch only selected date
export const getSelectedDateEvents = async (year: number, month: number, day: number): Promise<Event[]> => {
    const { data, error } = await supabase
        .from('calendar')
        .select('*')
        .eq('year', year)
        .eq('month', month)
        .eq('day', day);

    if (error) throw error;
    return data as Event[];
}

// supabase insert
export const insertData = async (year: number, month: number, day: number, wday: string, starttimeH: number | null, starttimeM: number | null, endtimeH: number | null, endtimeM: number | null, isWholeDay: boolean, title: string, description: string | null) => {
    const { error } = await supabase
        .from('calendar')
        .insert({
            year: year,
            month: month,
            day: day,
            wday: wday,
            starttimeH: starttimeH,
            starttimeM: starttimeM,
            endtimeH: endtimeH,
            endtimeM: endtimeM,
            isWholeDay: isWholeDay,
            title: title,
            description: description
        });
    if (error) {
        console.error(error);
    }
}

// supabase update
export const updateData = async (id: number, year: number, month: number, day: number, wday: string, starttimeH: number | null, starttimeM: number | null, endtimeH: number | null, endtimeM: number | null, isWholeDay: boolean, title: string, description: string | null) => {
    const { error } = await supabase
        .from('calendar')
        .update({
            year: year,
            month: month,
            day: day,
            wday: wday,
            starttimeH: starttimeH,
            starttimeM: starttimeM,
            endtimeH: endtimeH,
            endtimeM: endtimeM,
            isWholeDay: isWholeDay,
            title: title,
            description: description
        }).eq('id', id);

    if (error) {
        console.error(error);
    }
}

// supabase delete
export const deleteData = async (id: number) => {
    const { data, error } = await supabase
        .from('calendar')
        .delete()
        .eq('id', id)
    if (error) {
        console.error(error);
    }
}