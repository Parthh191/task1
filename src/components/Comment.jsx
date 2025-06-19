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
            <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/20 rounded-xl sm:rounded-2xl p-3 sm:p-6 backdrop-blur-sm border border-purple-500/10 hover:border-purple-500/20 transition-all duration-300 shadow-lg hover:shadow-purple-500/5">
                <div className="flex items-start gap-2 sm:gap-4">
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full ring-2 ring-purple-500/30 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1 sm:mb-2 flex-wrap gap-2">
                            <h4 className="font-medium text-base sm:text-lg bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent truncate">
                                {user.name}
                            </h4>
                            <span className="text-xs sm:text-sm text-gray-400 hover:text-purple-400 transition-colors whitespace-nowrap">
                                {dayjs(comment.createdAt).fromNow()}
                            </span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words">
                            {comment.text}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
