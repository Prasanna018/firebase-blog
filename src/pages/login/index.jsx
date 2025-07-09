/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUserAuth } from '@/context/userAuthContext';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import gsap from 'gsap';

const GoogleLogo = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);// Create this component or use the SVG directly

const Login = () => {
    const navigate = useNavigate();
    const { logIn, googleSignIn } = useUserAuth();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');

    // Animation setup
    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo('.login-container',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 }
        );

        tl.fromTo('.form-element',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
            '-=0.5'
        );

        return () => tl.kill();
    }, []);

    const handleForm = async (e) => {
        e.preventDefault();
        setError('');

        if (!userInfo.email || !userInfo.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        try {
            await logIn(userInfo.email, userInfo.password);
            navigate('/');
        } catch (err) {
            setError(err.message || 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async (e) => {
        e.preventDefault();

        setGoogleLoading(true);

        try {
            await googleSignIn();
            navigate('/');
        } catch (err) {
            setError(err.message || 'Failed to login with Google.');
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInfo(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="w-full h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-violet-900">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/5"
                        initial={{
                            scale: 0,
                            opacity: 0,
                            x: Math.random() * 100 - 50,
                            y: Math.random() * 100 - 50,
                        }}
                        animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 0.1, 0],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        style={{
                            width: `${100 + Math.random() * 200}px`,
                            height: `${100 + Math.random() * 200}px`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-md w-full z-10 login-container">
                <motion.div
                    layout
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
                    whileHover={{ scale: 1.01 }}
                >
                    <motion.div
                        className="text-center mb-8 form-element"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-white/80">Sign in to access your account</p>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mb-4 p-3 bg-red-500/20 text-red-100 rounded-lg text-sm backdrop-blur-sm form-element"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleForm} className="space-y-5">
                        <motion.div
                            className="form-element"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Label htmlFor="email" className="text-white/90 block mb-2">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50"
                                placeholder="your@email.com"
                                autoComplete="email"
                                required
                            />
                        </motion.div>

                        <motion.div
                            className="form-element"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Label htmlFor="password" className="text-white/90 block mb-2">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={userInfo.password}
                                onChange={handleInputChange}
                                className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-white/50"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                            />
                        </motion.div>

                        <motion.div
                            className="pt-2 form-element"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </motion.div>
                    </form>

                    <div className="relative my-6 form-element">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white/10 text-white/80 rounded-full backdrop-blur-sm">
                                OR
                            </span>
                        </div>
                    </div>

                    <motion.div
                        className="form-element"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Button
                            onClick={loginWithGoogle}
                            variant="outline"
                            className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white shadow-sm hover:shadow-md transition-all group"
                            disabled={googleLoading}
                        >
                            {googleLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <GoogleLogo className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    Continue with Google
                                </>
                            )}
                        </Button>
                    </motion.div>

                    <motion.div
                        className="mt-6 text-center text-sm text-white/80 form-element"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/signin')}
                            className="text-white hover:text-white/100 underline underline-offset-4 transition-colors font-medium"
                        >
                            Sign up
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;

