/* eslint-disable no-unused-vars */
import { getAllPosts } from '@/services/post-service';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTags, FaSpinner, FaClock, FaArrowLeft } from 'react-icons/fa';
import { format, formatDistanceToNow } from 'date-fns';

const SinglePost = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [singlePost, setSinglePost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            try {
                setLoading(true);
                const posts = await getAllPosts();
                const post = posts.find(p => p.id === params.id);

                if (!post) {
                    throw new Error('Post not found');
                }

                setSinglePost(post);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [params.id]);

    // Utility function to format Firebase Timestamp
    const formatFirebaseTimestamp = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return {
            exactDate: 'Date not available',
            relativeDate: '',
            time: '',
            fullDateTime: ''
        };

        const date = new Date(timestamp.seconds * 1000);

        return {
            exactDate: format(date, 'MMMM d, yyyy'),
            relativeDate: formatDistanceToNow(date, { addSuffix: true }),
            time: format(date, 'h:mm a'),
            fullDateTime: format(date, 'MMMM d, yyyy, h:mm a'),
            isoString: date.toISOString()
        };
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-screen"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="text-blue-500 text-4xl mb-4"
                >
                    <FaSpinner />
                </motion.div>
                <p className="text-gray-600 text-lg">Loading post...</p>
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
            >
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-gray-700">{error}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/blogs')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                    <FaArrowLeft /> Back to Blogs
                </motion.button>
            </motion.div>
        );
    }

    if (!singlePost) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-screen p-4 text-center"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Post Not Found</h2>
                <p className="text-gray-600">The requested post could not be found.</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/blogs')}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                    <FaArrowLeft /> Back to Blogs
                </motion.button>
            </motion.div>
        );
    }

    const dateInfo = formatFirebaseTimestamp(singlePost.createdAt);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
        >
            {/* Back to Blogs Button */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
            >
                <motion.button
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: '#3b82f6',
                        transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/blogs')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                    <motion.span
                        animate={{ x: [-2, 2, -2] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut"
                        }}
                    >
                        <FaArrowLeft />
                    </motion.span>
                    Back to Blogs
                </motion.button>
            </motion.div>

            <article className="bg-white rounded-xl shadow-md overflow-hidden">
                <motion.header
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 sm:p-8 border-b border-gray-100"
                >
                    <motion.h1
                        className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                        whileHover={{ scale: 1.01 }}
                    >
                        {singlePost.title}
                    </motion.h1>

                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm sm:text-base">
                        <div className="flex items-center group" title={dateInfo.fullDateTime}>
                            <FaCalendarAlt className="mr-2" />
                            <span className="group-hover:text-blue-600 transition-colors">
                                {dateInfo.exactDate}
                            </span>
                        </div>

                        <div className="flex items-center group" title="Published time">
                            <FaClock className="mr-2" />
                            <span className="group-hover:text-blue-600 transition-colors">
                                {dateInfo.time}
                            </span>
                        </div>

                        <div className="text-sm text-gray-400">
                            ({dateInfo.relativeDate})
                        </div>

                        {singlePost.tags && singlePost.tags.length > 0 && (
                            <div className="flex items-center flex-wrap gap-2">
                                <FaTags className="mr-2" />
                                {singlePost.tags.map((tag, index) => (
                                    <motion.span
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.header>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 sm:p-8"
                >
                    {singlePost.image && (
                        <motion.div
                            className="mb-6 -mx-6 sm:-mx-8 overflow-hidden rounded-lg"
                            whileHover={{ scale: 1.01 }}
                        >
                            <img
                                src={singlePost.image}
                                alt={singlePost.title}
                                className="w-full h-auto max-h-96 object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    )}

                    <div className="prose max-w-none text-gray-700">
                        {singlePost.description.split('\n').map((paragraph, i) => (
                            <motion.p
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="mb-4"
                            >
                                {paragraph}
                            </motion.p>
                        ))}
                    </div>
                </motion.div>
            </article>
        </motion.div>
    );
};

export default SinglePost;