'use client';
import { FormEvent, useState } from "react";
import styles from '../css/home.module.scss';

type FormData = {
    name: string;
    email: string;
    message: string;
    isJa: boolean;
}

type ContactRes = {
    success: boolean;
    message: string;
}

const Contact: React.FC<{lang: string}> = ({lang}) => {
    const isJa: boolean = lang === 'ja';
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
        isJa: isJa
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
            setStatus(isJa ? '全ての項目を入力してください。' : 'Please complete all sections.');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setStatus(isJa ? '有効なメールアドレスを入力してください。' : 'Please enter a valid e-mail address.');
            return false;
        }
        return true;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setStatus(isJa ? '送信中...' : 'In process...');

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
                setStatus(isJa ? '送信に成功しました。' : 'Your message has been sent successfully.');
                setFormData({name: '', email: '', message: '', isJa});
            } else {
                setStatus(isJa ? '送信に失敗しました。もう一度お試しください。' : 'Failed to send a message. Please try again.');
            }
        } catch (err) {
            setStatus(isJa ? '送信に失敗しました。もう一度お試しください。' : 'Failed to send a message. Please try again.');
        }
    }
    return (
        <>
            <form action="" autoComplete="off" onSubmit={handleSubmit}>
                <div className={styles.status}>{status && status}</div>
                <input type="text" name="name" value={formData.name} placeholder={isJa ? 'お名前' : 'name'} onChange={handleForm} />
                <input type="text" name="email" value={formData.email} placeholder={isJa ? 'メールアドレス' : 'e-mail'} onChange={handleForm} />
                <textarea name="message" value={formData.message} placeholder={isJa ? 'メッセージ' : 'message'} onChange={handleForm}></textarea>
                <button type="submit" className={styles.submit}>{isJa ? '送信' : 'submit'}</button>
            </form>
        </>
    );
}

export default Contact;