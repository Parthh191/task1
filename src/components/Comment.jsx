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
            className="relative w-full"
        >
            <div className="bg-white/80 dark:bg-blog-dark-deeper/80 rounded-lg sm:rounded-xl p-2 sm:p-6 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/5 group w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 dark:from-purple-500/10 dark:via-transparent dark:to-pink-500/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-start space-x-2 sm:space-x-4 relative">
                    <motion.div className="flex-shrink-0">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={user.image}
                            alt={user.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-purple-500/30 object-cover group-hover:ring-purple-500/50 transition-all duration-300"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-blog-dark-deeper"></span>
                    </motion.div>
                    <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="font-medium text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent truncate">
                                {user.name}
                            </h4>
                            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors whitespace-nowrap flex-shrink-0">
                                {dayjs(comment.createdAt).fromNow()}
                            </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                            {comment.text}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
