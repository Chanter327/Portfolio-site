'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Register from '@/components/Register';
import { wdays, supabase, generateCalendar, getCalendarData } from '@/features/calendar';
import styles from '@/css/calendar.module.scss';

interface RegisterData {
    year: number;
    month: number;
    day: number;
    wday: string;
}

interface EventData {
    id: number;
    year: number;
    month: number;
    day: number;
    wday: string;
    starttimeH: number | null;
    starttimeM: number | null;
    endtimeH: number | null;
    endtimeM: number | null;
    isWholeDay: boolean;
    title: string;
    description: string | null;
}

const Calendar: React.FC = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const [month, setMonth] = useState<number>(currentMonth);
    const [year, setYear] = useState<number>(currentYear);

    const [isRegisterActive, setIsRegisterActive] = useState<boolean>(false);
    const [register, setRegister] = useState<RegisterData | null>(null);
    const handleRegister = (isActive: boolean, year: number, month: number, day: number, wday: string) => {
      setIsRegisterActive(isActive);
      setRegister({ year, month, day, wday });
    };

    const days = generateCalendar(year, month - 1);
    const handleMonthChange = (direction: number) => {
        if (month + direction > 12) {
            setMonth(1);
            setYear(year + 1);
        } else if (month + direction < 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month + direction);
        }
    };
    const backToThisMonth = () => {
        setYear(currentYear);
        setMonth(currentMonth);
    };

    const [data, setData] = useState<EventData[]>([]);

    const fetchRealTimeData = () => {
        supabase
            .channel('calendar')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'calendar',
                },
                (payload) => {
                    if (payload.new) {
                        const { id, year, month, day, wday, starttimeH, starttimeM, endtimeH, endtimeM, isWholeDay, title, description } = payload.new as EventData;
                        setData((prevData) => [...prevData, {id, year, month, day, wday, starttimeH, starttimeM, endtimeH, endtimeM, isWholeDay, title, description}]);
                    }
                }
            )
            .subscribe();
            
            return () => supabase.channel('calendar').unsubscribe();
    }
    const fetchData = async () => {
        try {
            const response = await getCalendarData();
            setData(response);
        } catch (error) {
            console.error(`failed to fetch data: ${error}`);
        }
    }

    useEffect(() => {
        fetchData();
        fetchRealTimeData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [data]);

    return (
        <>
            {isRegisterActive && register !== null &&
                <Register handleRegister={handleRegister} isActive year={register!.year} month={register!.month} day={register!.day} wday={register!.wday} />
            }
            <div className={styles.calendar}>
                <div className={styles.today} onClick={backToThisMonth}>{`${currentYear} / ${currentMonth} / ${today.getDate()} (${wdays[today.getDay()]})`}</div>
                <div className={styles.calendarInfo}>
                    <div className={styles.handler} onClick={() => handleMonthChange(-1)}>←</div>
                    <div className={styles.yearMonth}>
                        <span>{year}</span> 年 <span>{month}</span> 月
                    </div>
                    <div className={styles.handler} onClick={() => handleMonthChange(1)}>→</div>
                </div>
                <div className={styles.wdays}>{wdays.map((d, i) => <li key={i}>{d}</li>)}</div>
                <div className={styles.days}>
                    {days.map((d, i) => (
                        <Link href={`/apps/calendar/${d.year}-${d.month}-${d.day}`} key={i} className={`${styles.day} ${d.year === currentYear && d.month === currentMonth && d.day === today.getDate() && styles.highlight}`}>
                            <div className={`${styles.date} ${!(d.isCurrentMonth) && styles.diffMonth}`}><div>{d.day}</div></div>
                            <div className={styles.events}>
                                {data?.filter(e => d.year === e.year && d.month === e.month && d.day === e.day).map((e, i) => (
                                    <div
                                        key={i}
                                        className={styles.event} 
                                    >
                                        <div>{e.title}</div>
                                    </div>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className={styles.calendarInfo}>
                    <div className={styles.handler} onClick={() => handleMonthChange(-1)}>←</div>
                    <div className={styles.yearMonth}>
                        <span>{year}</span> 年 <span>{month}</span> 月
                    </div>
                    <div className={styles.handler} onClick={() => handleMonthChange(1)}>→</div>
                </div>
            </div>
        </>
    );
};

export default Calendar;