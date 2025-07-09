import BlogFeatured from '@/components/Feture';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import { useUserAuth } from '@/context/userAuthContext'
import React from 'react'

const Home = () => {
    const { user } = useUserAuth();
    console.log(user)
    return (
        <div>
            <Header></Header>
            <HeroSection></HeroSection>
            <BlogFeatured></BlogFeatured>

        </div>
    )
}

export default Home

