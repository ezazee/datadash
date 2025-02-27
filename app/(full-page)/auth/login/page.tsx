'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '@/layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', {
        'p-input-filled': layoutConfig.inputStyle === 'filled'
    });

    // Validasi Email  (Harus dipindahkan bersama dengan handle Login)
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Handle Login (HARUS DI RAPIKAN NANTI)
    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        // Validasi input
        if (!email || !password) {
            setMessage('Email and password are required');
            return;
        }

        if (!validateEmail(email)) {
            setMessage('Invalid email format');
            return;
        }

        try {
            setLoading(true);
            // Kirim permintaan POST ke API route
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userId', data.userId);
                localStorage.setItem('expirationTime', expirationTime.toString());

                // Redirect ke dashboard
                router.push('/');
            } else {
                setMessage(data.message || 'An error occurred while logging in');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setMessage('An error occurred while logging in');
        } finally {
            setLoading(false);
        }
    };

    //   Function Pembacaan session
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userId = localStorage.getItem('userId');
        const expirationTime = localStorage.getItem('expirationTime');

        if (isLoggedIn && userId && expirationTime) {
            const currentTime = new Date().getTime();
            if (currentTime < parseInt(expirationTime)) {
                router.push('/');
            } else {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userId');
                localStorage.removeItem('expirationTime');
            }
        }
    }, [router]);

    //   Function Afar Tidak bisa di back setelah login
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Welcome To DataDash Hacker!!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>
                        <form onSubmit={handleLogin}>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email1" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />
                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} tabIndex={1} placeholder="Enter Password" className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>
                            <div className="flex align-items-center justify-content-between mb-5 gap-5"></div>
                            {loading ? <ProgressSpinner className="flex align-items-center" /> : <Button label="Sign In" className="w-full p-3 text-xl" onClick={handleLogin}></Button>}
                            {message && <p className="text-red-500 mt-3">{message}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
