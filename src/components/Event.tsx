import React, { useState, useEffect } from 'react';
import { updateData, deleteData, yearArray, monthArray, dayArray, hourArray, minutesArray } from '@/features/calendar';
import styles from '@/css/popup.module.scss';

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

interface EventProps extends EventData {
    handleEvent: (isActive: boolean, eventData: EventData | null) => void;
}

const Event: React.FC<EventProps> = (props) => {
    const closeEvent = () => {
        props.handleEvent(false, null);
    };
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        closeEvent();
    };
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const [eventForm, setEventForm] = useState<EventData>({...props});

    // 曜日を計算する関数
    const calculateWeekday = (year: number, month: number, day: number) => {
        const date = new Date(year, month - 1, day);
        const wdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return wdays[date.getDay()];
    };

    const handleEventForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEventForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleIsWholeDay = () => {
        setEventForm(prev => ({
            ...prev,
            isWholeDay: !prev.isWholeDay
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateData(eventForm.id, eventForm.year, eventForm.month, eventForm.day, eventForm.wday, eventForm.starttimeH, eventForm.starttimeM, eventForm.endtimeH, eventForm.endtimeM, eventForm.isWholeDay, eventForm.title, eventForm.description);
        setEventForm({...props});
        closeEvent();
    }

    const handleDelete = (id: number) => {
        deleteData(id);
        closeEvent();
    }

    useEffect(() => {
        const newWday = calculateWeekday(eventForm.year, eventForm.month, eventForm.day);
        setEventForm(prev => ({
            ...prev,
            wday: newWday
        }));
    }, [eventForm.year, eventForm.month, eventForm.day]);

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
            <div className={styles.container} onClick={handleContainerClick}>
                <div className={styles.btn} onClick={closeEvent}>閉じる</div>
                <div className={styles.wrapper}>
                    <div className={styles.title}>イベント</div>
                    <div className={styles.title}>{eventForm.year} / {eventForm.month} / {eventForm.day} ({eventForm.wday})</div>
                    <form onSubmit={handleSubmit}>
                        <ul className={styles.formContent}>
                            <li>
                                <div>日付: </div>
                                <div className={styles.selecter}>
                                    <select name="year" value={eventForm.year} onChange={handleEventForm}>
                                        {yearArray.map((y) => (
                                            <option value={y} key={y}>{y}</option>
                                        ))}
                                    </select> / 
                                    <select name="month" value={eventForm.month} onChange={handleEventForm}>
                                        {monthArray.map((m) => (
                                            <option value={m} key={m}>{m}</option>
                                        ))}
                                    </select> / 
                                    <select name="day" value={eventForm.day} onChange={handleEventForm}>
                                        {dayArray.map((d) => (
                                            <option value={d} key={d}>{d}</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            {!eventForm.isWholeDay &&
                                <>
                                <li className={styles.dateSelecter}>
                                    <div>開始: </div>
                                    <div className={styles.selecter}>
                                        <select name="starttimeH" value={eventForm.starttimeH!} className={styles.time} onChange={handleEventForm}>
                                            <option value="">---</option>
                                            {hourArray.map((h) => (
                                                <option value={h} key={h}>{h.toString().padStart(2, '0')}</option>
                                            ))}
                                        </select>
                                        <span> : </span>
                                        <select name="starttimeM" value={eventForm.starttimeM!} className={styles.time} onChange={handleEventForm}>
                                            <option value="">---</option>
                                            {minutesArray.map((m) => (
                                                <option value={m} key={m}>{m.toString().padStart(2, '0')}</option>
                                            ))}
                                        </select>
                                    </div>
                                </li>
                                <li className={styles.dateSelecter}>
                                    <div>終了: </div>
                                    <div className={styles.selecter}>
                                        <select name="endtimeH" value={eventForm.endtimeH!} className={styles.time} onChange={handleEventForm}>
                                            <option value="">---</option>
                                            {hourArray.map((h) => (
                                                <option value={h} key={h}>{h.toString().padStart(2, '0')}</option>
                                            ))}
                                        </select>
                                        <span> : </span>
                                        <select name="endtimeM" value={eventForm.endtimeM!} className={styles.time} onChange={handleEventForm}>
                                            <option value="">---</option>
                                            {minutesArray.map((m) => (
                                                <option value={m} key={m}>{m.toString().padStart(2, '0')}</option>
                                            ))}
                                        </select>
                                    </div>
                                </li>
                                </>
                            }
                            <li style={{display: 'flex', alignItems: 'center', justifyContent: 'left', cursor: 'pointer'}} onClick={handleIsWholeDay}>
                                <div className={`${styles.checkbox} ${eventForm.isWholeDay && styles.active}`}></div>
                                <div>終日</div>
                            </li>
                            <li>
                                <div>タイトル: </div>
                                <input 
                                    type="text" 
                                    name="title" 
                                    value={eventForm.title} 
                                    onChange={handleEventForm} 
                                />
                            </li>
                            <li>
                                <div>備考: </div>
                                <textarea 
                                    name="description" 
                                    value={eventForm.description ?? ""} 
                                    onChange={handleEventForm}
                                ></textarea>
                            </li>
                        </ul>
                        <div className={styles.btnContainer}>
                            <input type="submit" value="更新" />
                            <input type="button" value="削除" onClick={() => handleDelete(eventForm.id)} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Event;