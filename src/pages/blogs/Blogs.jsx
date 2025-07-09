/* eslint-disable no-unused-vars */
import { getAllPosts } from '@/services/post-service';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiTag, FiHome, FiChevronLeft } from 'react-icons/fi';
import { format, formatDistanceToNow } from 'date-fns';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const posts = await getAllPosts();
                setPosts(posts);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };
        getPosts();
    }, []);

    // Format Firebase Timestamp consistently with SinglePost
    const formatFirebaseTimestamp = (timestamp) => {
        if (!timestamp?.seconds) return {
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

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                    }}
                    className="text-blue-500 text-4xl mb-4"
                >
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </motion.div>
                <p className="text-gray-600 text-lg">Loading articles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center"
            >
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-gray-700 mb-4">{error}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                    Try Again
                </motion.button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back to Home Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10"
            >
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
                >
                    <FiChevronLeft className="mr-2" />
                    <FiHome className="mr-2" />
                    Back to Home
                </Link>
            </motion.div>

            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12 text-center"
            >
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Articles</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    Discover our latest stories, tutorials, and insights
                </p>
            </motion.div>

            {/* Blog Posts Grid */}
            <motion.div
                initial="hidden"
                animate="show"
                variants={container}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {posts.map((post) => {
                    const dateInfo = formatFirebaseTimestamp(post.createdAt);

                    return (
                        <motion.div
                            key={post.id}
                            variants={item}
                            whileHover={{
                                y: -8,
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                            }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 flex flex-col"
                        >
                            <div className="p-6 flex-grow">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                                    {post.description}
                                </p>

                                {post.tags?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map((tag, index) => (
                                            <motion.span
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 transition-colors duration-200 hover:bg-blue-200 dark:hover:bg-blue-800"
                                            >
                                                <FiTag className="mr-1" size={12} />
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 pt-0 mt-auto">
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <FiCalendar className="mr-2" />
                                        <span title={dateInfo.fullDateTime}>
                                            {dateInfo.exactDate}
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {dateInfo.relativeDate}
                                        </span>
                                    </div>

                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="group inline-flex items-center"
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-all duration-300 group-hover:shadow-lg"
                                        >
                                            Read More
                                            <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                        </motion.span>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Empty State */}
            {!loading && posts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-20"
                >
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                        <svg
                            className="w-16 h-16 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                        No articles found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Check back later for new content
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Refresh
                    </motion.button>
                </motion.div>
            )}
        </div>
    );
};

export default Blogs;