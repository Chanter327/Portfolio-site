import { insertData, yearArray, monthArray, dayArray, hourArray, minutesArray, timeValidation } from '@/features/calendar';
import styles from '@/css/calendar.module.scss';
import { useState } from 'react';

interface RegisterProps {
    handleRegister: (isActive: boolean, year: number, month: number, day: number, wday: string) => void;
    year: number;
    month: number;
    day: number;
    wday: string;
}

interface EventForm {
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

const Register: React.FC<RegisterProps> = (props) => {
    const closeRegister = () => {
        props.handleRegister(false, props.year, props.month, props.day, props.wday);
    };
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        closeRegister();
    };
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const [registerForm, setRegisterForm] = useState<EventForm>({
        year: props.year,
        month: props.month,
        day: props.day,
        wday: props.wday,
        starttimeH: null,
        starttimeM: null,
        endtimeH: null,
        endtimeM: null,
        isWholeDay: false,
        title: '',
        description: null,
    });

    const handleEventForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRegisterForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [isWholeDay, setIsWholeDay] = useState<boolean>(registerForm.isWholeDay);
    const handleIsWholeDay = () => {
        if (isWholeDay) {
            setIsWholeDay(false);
        } else {
            setIsWholeDay(true);
        }
    }

    const [submitError, setSubmitError] = useState<boolean>(false);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, year: number, month: number, day: number, wday: string, starttimeH: number | null, starttimeM: number | null, endtimeH: number | null, endtimeM: number | null, isWholeDay: boolean, title: string, description: string | null) => {
        e.preventDefault();
        if (isWholeDay) {
            starttimeH = null;
            starttimeM = null;
            endtimeH = null;
            endtimeM = null;
        } 
        if (title === '') {
            setSubmitError(true);
            return;
        }else if (!isWholeDay && !timeValidation(starttimeH, starttimeM, endtimeH, endtimeM)) {
            setSubmitError(true);
            return;
        } else {
            setSubmitError(false);
        }
        await insertData(year, month, day, wday, starttimeH, starttimeM, endtimeH, endtimeM, isWholeDay, title, description);
        setRegisterForm({
            year: props.year,
            month: props.month,
            day: props.day,
            wday: props.wday,
            starttimeH: null,
            starttimeM: null,
            endtimeH: null,
            endtimeM: null,
            isWholeDay: false,
            title: '',
            description: null,
        });
        closeRegister();
    }

    return (
      <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.container} onClick={handleContainerClick}>
        <div className={styles.btn} onClick={closeRegister}>閉じる</div>
        <div className={styles.wrapper}>
            <div className={styles.title}>イベント追加</div>
                {submitError &&
                    <div className={styles.errorNotice}>
                        入力内容を確認してください。時間、タイトルは空欄にできません。
                    </div>
                }
                <form onSubmit={(e) => handleSubmit(e, registerForm.year, registerForm.month, registerForm.day, registerForm.wday, registerForm.starttimeH, registerForm.starttimeM, registerForm.endtimeH, registerForm.endtimeM, isWholeDay, registerForm.title, registerForm.description)}>
                    <ul className={styles.formContent}>
                        <li className={styles.dateSelecter}>
                            <div>日付: </div>
                            <div className={styles.selecter}>
                                <select name="year" value={registerForm.year} onChange={handleEventForm}>
                                    {yearArray.map((y, i) => (
                                        <option value={y} key={i}>{y}</option>
                                    ))}
                                </select> / 
                                <select name="month" value={registerForm.month} onChange={handleEventForm}>
                                    {monthArray.map((m, i) => (
                                        <option value={m} key={i}>{m}</option>
                                    ))}
                                </select> / 
                                <select name="day" value={registerForm.day} onChange={handleEventForm}>
                                    {dayArray.map((d, i) => (
                                        <option value={d} key={i}>{d}</option>
                                    ))}
                                </select>
                            </div>
                        </li>
                        {!isWholeDay &&
                            <>
                            <li className={styles.dateSelecter}>
                                <div>開始: </div>
                                <div className={styles.selecter}>
                                    <select name="starttimeH" value={registerForm.starttimeH!} className={styles.time} onChange={handleEventForm}>
                                        <option value="">---</option>
                                        {hourArray.map((h, i) => (
                                            <option value={h} key={i}>{h <= 9 ? `0${h}` : h}</option>
                                        ))}
                                    </select>
                                    <span> : </span>
                                    <select name="starttimeM" value={registerForm.starttimeM!} className={styles.time} onChange={handleEventForm}>
                                        <option value="">---</option>
                                        {minutesArray.map((m, i) => (
                                            <option value={m} key={i}>{m <= 9 ? `0${m}` : m}</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            <li className={styles.dateSelecter}>
                                <div>終了: </div>
                                <div className={styles.selecter}>
                                    <select name="endtimeH" value={registerForm.endtimeH!} className={styles.time} onChange={handleEventForm}>
                                        <option value="">---</option>
                                        {hourArray.map((h, i) => (
                                            <option value={h} key={i}>{h <= 9 ? `0${h}` : h}</option>
                                        ))}
                                    </select>
                                    <span> : </span>
                                    <select name="endtimeM" value={registerForm.endtimeM!} className={styles.time} onChange={handleEventForm}>
                                        <option value="">---</option>
                                        {minutesArray.map((m, i) => (
                                            <option value={m} key={i}>{m <= 9 ? `0${m}` : m}</option>
                                        ))}
                                    </select>
                                </div>
                            </li>
                            </>
                        }
                        <li style={{display: 'flex', alignItems: 'center', justifyContent: 'left', cursor: 'pointer'}} onClick={handleIsWholeDay}><div className={`${styles.checkbox} ${isWholeDay && styles.active}`}></div><div>終日</div></li>
                        <li><div>タイトル: </div><input type="text" name="title" id="" onChange={handleEventForm} value={registerForm.title} /></li>
                        <li><div>備考: </div><textarea name="description" id="" aria-braillelabel='false' onChange={handleEventForm} value={registerForm.description!}></textarea></li>
                    </ul>
                    <div className={styles.btnContainer}>
                        <input type="submit" value="追加" />
                    </div>
                </form>
            </div>
        </div>
      </div>
    );
  };
  
  export default Register;
  