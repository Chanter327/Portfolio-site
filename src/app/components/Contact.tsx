'use client';
import { FormEvent, useState } from "react";
import styles from '../css/home.module.scss';

type FormData = {
    name: string;
    email: string;
    message: string;
}

type ContactRes = {
    success: boolean;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<string | null>(null);

    const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const validateForm = (): boolean => {
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('全ての項目を入力してください。');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setStatus('有効なメールアドレスを入力してください。');
            return false;
        }
        return true;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus('送信中...');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(formData),
            });
            const data: ContactRes = await response.json();
            if (response.ok) {
                setStatus(data.message);
                setFormData({name: '', email: '', message: ''});
            } else {
                setStatus(data.message || '送信に失敗しました。もう一度お試しください');
            }
        } catch (err) {
            setStatus('送信に失敗しました。もう一度お試しください。');
        }
    }
    return (
        <>
            <form action="" autoComplete="off" onSubmit={handleSubmit}>
                <div className={styles.status}>{status && status}</div>
                <input type="text" name="name" value={formData.name} placeholder="お名前" onChange={handleForm} />
                <input type="text" name="email" value={formData.email} placeholder="メールアドレス" onChange={handleForm} />
                <textarea name="message" value={formData.message} placeholder="メッセージ" onChange={handleForm}></textarea>
                <button type="submit" className={styles.submit}>送信</button>
            </form>
        </>
    );
}

export default Contact;