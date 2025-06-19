import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { getProfile } from '../service/api';

dayjs.extend(relativeTime);

export default function Comment({ comment }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getProfile(comment.userId);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [comment.userId]);

    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
        >
            <div className="bg-white/80 dark:bg-blog-dark-deeper/80 rounded-xl sm:rounded-2xl p-3 sm:p-6 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/5 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-500/10 dark:via-transparent dark:to-pink-500/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-start gap-2 sm:gap-4 relative">
                    <motion.div className="relative">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={user.image}
                            alt={user.name}
                            className="w-8 h-8 sm:w-12 sm:h-12 rounded-full ring-2 ring-purple-500/30 object-cover group-hover:ring-purple-500/50 transition-all duration-300"
                        />
                        <span className="absolute -bottom-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-500 border-2 border-white dark:border-blog-dark-deeper"></span>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 sm:mb-2 flex-wrap gap-2">
                            <h4 className="font-medium text-base sm:text-lg bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent truncate">
                                {user.name}
                            </h4>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors whitespace-nowrap">
                                {dayjs(comment.createdAt).fromNow()}
                            </span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                            {comment.text}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
