import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const particlesRef = useRef([]);
    const floatingElementsRef = useRef([]);
    const animatedShapesRef = useRef([]);
    const contentRef = useRef(null);

    const particles = Array(25).fill(0);
    const floatingElements = ['✍️', '📚', '✨', '🖋️', '📖', '🌟', '📝', '📓'];
    const animatedShapes = Array(8).fill(0);

    useEffect(() => {
        // Reset all refs to their initial state
        gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, contentRef.current], {
            opacity: 1,
            y: 0
        });

        gsap.set(particlesRef.current, { clearProps: "all" });
        gsap.set(floatingElementsRef.current, { clearProps: "all" });
        gsap.set(animatedShapesRef.current, { clearProps: "all" });

        const gradientAnimation = gsap.to(heroRef.current, {
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            duration: 20,
            ease: 'none',
            yoyo: true,
            repeat: -1
        });

        // Content animations
        const contentTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        contentTimeline
            .from(contentRef.current, {
                opacity: 0,
                y: 20,
                duration: 1.5,
                delay: 0.3
            })
            .from(titleRef.current, {
                y: 60,
                opacity: 0,
                duration: 1.2
            }, "-=1.2")
            .from(subtitleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1
            }, "-=1.0")
            .from(ctaRef.current, {
                y: 40,
                opacity: 0,
                duration: 0.8
            }, "-=0.8");

        // Background elements with lower opacity
        particlesRef.current.forEach((particle) => {
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: Math.random() * 5 + 2,
                height: Math.random() * 5 + 2,
                opacity: Math.random() * 0.2 + 0.05,
                backgroundColor: `hsla(200, 80%, 70%, 0.3)`,
                borderRadius: '50%',
                zIndex: 1
            });

            gsap.to(particle, {
                x: '+=100',
                y: '+=100',
                duration: Math.random() * 15 + 10,
                delay: Math.random() * 5,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });
        });

        floatingElementsRef.current.forEach((element) => {
            gsap.set(element, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * 0.7,
                rotation: Math.random() * 180 - 90,
                opacity: 0.3,
                zIndex: 2
            });

            gsap.to(element, {
                y: '+=100',
                rotation: '+=45',
                opacity: 0.5,
                duration: Math.random() * 20 + 20,
                delay: Math.random() * 5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });

        animatedShapesRef.current.forEach((shape, i) => {
            gsap.set(shape, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                width: Math.random() * 30 + 20,
                height: Math.random() * 30 + 20,
                opacity: 0.1,
                backgroundColor: `hsla(210, 80%, 60%, 0.1)`,
                borderRadius: i % 3 === 0 ? '50%' : '10%',
                rotate: Math.random() * 360,
                zIndex: 1
            });

            gsap.to(shape, {
                x: '+=150',
                y: '+=80',
                rotate: '+=180',
                duration: Math.random() * 25 + 15,
                delay: Math.random() * 5,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });

        return () => {
            gradientAnimation.kill();
            contentTimeline.kill();
            gsap.killTweensOf([
                ...particlesRef.current,
                ...floatingElementsRef.current,
                ...animatedShapesRef.current
            ]);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-white px-4"
            style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)'
            }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {particles.map((_, i) => (
                    <div key={`particle-${i}`} ref={el => particlesRef.current[i] = el} className="absolute rounded-full" />
                ))}
                {animatedShapes.map((_, i) => (
                    <div key={`shape-${i}`} ref={el => animatedShapesRef.current[i] = el} className="absolute" />
                ))}
                {floatingElements.map((el, i) => (
                    <div key={`float-${i}`} ref={el => floatingElementsRef.current[i] = el} className="absolute text-3xl md:text-4xl pointer-events-none">
                        {el}
                    </div>
                ))}
            </div>

            {/* Main content */}
            <div
                ref={contentRef}
                className="relative z-10 text-center w-full max-w-4xl mx-auto px-6 py-12 md:px-8 md:py-16 rounded-2xl"
                style={{
                    backdropFilter: 'blur(16px)',
                    backgroundColor: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.6)',
                    margin: '0 1rem'
                }}
            >
                <h1
                    ref={titleRef}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 md:mb-8 tracking-tight leading-tight"
                    style={{
                        background: 'linear-gradient(90deg, #ffffff, #a5b4fc)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '0 4px 15px rgba(100,200,255,0.6)',
                        lineHeight: '1.1'
                    }}
                >
                    Discover <span className="text-yellow-300">Amazing</span> Stories
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-xl sm:text-2xl md:text-3xl mb-8 md:mb-12 mx-auto font-bold px-2"
                    style={{
                        color: 'rgba(255,255,255,0.95)',
                        textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                        lineHeight: '1.4'
                    }}
                >
                    Dive into our collection of inspiring articles, tutorials, and creative writing from passionate authors.
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                    <button
                        className="px-8 py-3 sm:px-10 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
                        style={{
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            color: 'white',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                        }}
                    >
                        Explore Articles
                    </button>
                    <button
                        className="px-8 py-3 sm:px-10 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105"
                        style={{
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(100, 150, 255, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.4)',
                            color: 'white',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                        }}
                    >
                        Join Community
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
                <div className="animate-bounce w-8 h-14 rounded-full flex justify-center items-start pt-2" style={{
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.8)'
                }}>
                    <div className="w-2 h-4 rounded-full bg-white bg-opacity-90"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;