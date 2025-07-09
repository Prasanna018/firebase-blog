/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiClock, FiBookmark } from 'react-icons/fi';

const BlogFeatured = () => {
    const featuredPosts = [
        {
            id: 1,
            title: "The Future of Web Development in 2024",
            excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
            category: "Technology",
            date: "May 15, 2024",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 2,
            title: "Mastering React Performance Optimization",
            excerpt: "Advanced techniques to make your React applications lightning fast.",
            category: "Development",
            date: "June 2, 2024",
            readTime: "12 min read",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 3,
            title: "Design Systems for Developers",
            excerpt: "How to implement and maintain design systems in large-scale applications.",
            category: "Design",
            date: "June 10, 2024",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        },
        hover: {
            y: -10,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={textVariants}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Featured <span className="text-blue-600">Articles</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Discover our most popular and insightful blog posts about web development, design, and technology.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    {featuredPosts.map((post) => (
                        <motion.article
                            key={post.id}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            variants={cardVariants}
                            whileHover="hover"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <motion.img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {post.category}
                                </motion.div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                                    <div className="flex items-center">
                                        <FiCalendar className="mr-1" />
                                        <span>{post.date}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FiClock className="mr-1" />
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>

                                <motion.h3
                                    className="text-xl font-bold text-gray-900 mb-3"
                                    whileHover={{ color: "#2563eb" }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {post.title}
                                </motion.h3>

                                <p className="text-gray-600 mb-6">{post.excerpt}</p>

                                <motion.div
                                    className="flex items-center text-blue-600 font-medium"
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span>Read more</span>
                                    <FiArrowRight className="ml-2" />
                                </motion.div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        View All Articles
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogFeatured;