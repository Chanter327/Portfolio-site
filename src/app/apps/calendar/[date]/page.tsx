'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, getSelectedDateEvents ,wdays } from "@/features/calendar";
import Register from "@/components/Register";
import Event from "@/components/Event";
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

const SelectedDate: React.FC = () => {
    const { date } = useParams();
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const [year, month, day] = selectedDate.split('-').map(Number);
    const [events, setEvents] = useState<EventData[]>([]);

    const dayOfWeek = new Date(year, month - 1, day).getDay();
    const wday = wdays[dayOfWeek];

    const fetchData = async () => {
        const data = await getSelectedDateEvents(year, month, day);
        setEvents(data);
    }

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
                        setEvents((prevData) => [...prevData, {id, year, month, day, wday, starttimeH, starttimeM, endtimeH, endtimeM, isWholeDay, title, description}]);
                    }
                }
            )
            .subscribe();
            
            return () => supabase.channel('calendar').unsubscribe();
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        fetchData();
    }, [events]);

    const [isRegisterActive, setIsRegisterActive] = useState<boolean>(false);
    const [register, setRegister] = useState<RegisterData | null>(null);
    const handleRegister = (isActive: boolean, year: number, month: number, day: number, wday: string) => {
      setIsRegisterActive(isActive);
      setRegister({ year, month, day, wday });
    };

    const [isEventActive, setIsEventActive] = useState<boolean>(false);
    const [event, setEvent] = useState<EventData | null>(null);
    const handleEventClick = (
        isActive: boolean, 
        eventData: EventData | null,
    ) => {
        setIsEventActive(isActive);
        setEvent(eventData);
    };

    return (
        <>
        {isRegisterActive && register !== null &&
            <Register handleRegister={handleRegister} isActive year={register.year} month={register.month} day={register.day} wday={register.wday} />
        }

        {isEventActive && event !== null && (
            <Event 
                handleEvent={handleEventClick} 
                id={event.id}
                year={event.year}
                month={event.month}
                day={event.day}
                wday={event.wday}
                starttimeH={event.starttimeH}
                starttimeM={event.starttimeM}
                endtimeH={event.endtimeH}
                endtimeM={event.endtimeM}
                isWholeDay={event.isWholeDay}
                title={event.title}
                description={event.description}
            />
        )}
        <Link href={'/apps/calendar'} className={styles.back}>戻る</Link>
        <div className={styles.dateContainer}>
            <div className={styles.date}>{year} / {month} / {day} ({wday})<br className={styles.mb} /> <span style={{fontSize: '1.6rem', cursor: 'pointer'}} onClick={() => handleRegister(true, year, month, day, wday)}>イベントを追加</span></div>
            {events.length > 0 ? (
                <div>
                {events?.map((e, i) => (
                    <div
                        key={i}
                        className={styles.event}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleEventClick(true, e)}}
                    >
                        <div>{e.title}</div>
                        {e.starttimeH && e.starttimeM && e.endtimeH && e.endtimeM ? (
                            <div>
                                {e.starttimeH! < 10 ? `0${e.starttimeH}` : e.starttimeH}:{e.starttimeM! < 10 ? `0${e.starttimeM}` : e.starttimeM} - {e.starttimeH! < 10 ? `0${e.endtimeH}` : e.endtimeH}:{e.endtimeM! < 10 ? `0${e.endtimeM}` : e.endtimeM}
                            </div>
                        ) : (
                            <div>終日</div>
                        )
                        }
                    </div>
                ))}
                </div>
            ) : (
                <div style={{fontSize: '2.4rem', marginTop: '20px'}}>イベントはありません。</div>
            )}
        </div>
        </>
    );
}

export default SelectedDate;