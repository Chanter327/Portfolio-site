import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type FormData = {
    name: string;
    email: string;
    message: string;
}

export async function POST(req: NextRequest) {
    // CORSヘッダーを設定
    const headers = new Headers();
    headers.set('Access-Control-Allow-Credentials', 'true');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    headers.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    try {
        const data: FormData = await req.json();
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.GMAIL,
            to: process.env.GMAIL,
            subject: 'サイトフォームお問い合わせ',
            text: `名前: ${data.name}\nメールアドレス: ${data.email}\nメッセージ:\n${data.message}`
        });

        await transporter.sendMail({
            from: process.env.GMAIL,
            to: data.email,
            subject: 'お問合せを送信しました',
            text: `${data.name}様\n\n以下の内容でお問合せを送信しました。\n\n\n名前: ${data.name}\nメールアドレス: ${data.email}\nメッセージ:\n${data.message}`
        })

        return NextResponse.json(
            { status: 'success', message: 'メッセージを送信しました。' },
            { status: 200, headers: headers }
        );
    } catch (err) {
        console.error('メール送信エラー:', err);
        return NextResponse.json(
            { status: 'fail', message: 'メッセージの送信に失敗しました。もう一度お試しください。' },
            { status: 500, headers: headers }
        );
    }
}