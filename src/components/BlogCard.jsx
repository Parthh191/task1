import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getProfile, getComments } from "../service/api";
import { BiCommentDetail, BiUser } from "react-icons/bi";
import { FiClock, FiCalendar } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

dayjs.extend(relativeTime);

export default function BlogCard({ post }) {
  const [author, setAuthor] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const { theme } = useTheme();
  const readTime = Math.max(1, Math.ceil(post.content.split(" ").length / 200));

  useEffect(() => {
    const fetchAuthorAndComments = async () => {
      try {
        const [authorData, commentsData] = await Promise.all([
          getProfile(post.authorId),
          getComments(post.id),
        ]);
        setAuthor(authorData.data);
        setCommentCount(commentsData.data.length);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchAuthorAndComments();
  }, [post]);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/80 to-indigo-900/80 dark:from-purple-900/80 dark:to-indigo-900/80 from-purple-100 to-indigo-100 p-1.5 border border-transparent hover:border-purple-500/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full rounded-xl bg-blog-light-secondary dark:bg-gray-900/90 backdrop-blur-sm flex flex-col overflow-hidden">
        <Link to={`/post/${post.id}`} className="flex-1 flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <div className="aspect-[16/10]">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={post.thumbnail}
                alt={post.title}
                className="h-full w-full object-cover transform transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-gray-100/40 to-transparent dark:from-gray-900 dark:via-gray-900/40 dark:to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" />
            
            {/* Category Tag */}
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300">
                {post.category || "Blog"}
              </span>
            </div>

            {/* Meta Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-blog-light-text dark:text-white/90">
              <span className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                {dayjs(post.createdAt).format("MMM D, YYYY")}
              </span>
              <span className="flex items-center gap-2">
                <FiClock className="w-4 h-4" />
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 flex flex-col p-6">
            <motion.h2
              whileHover={{ x: 4 }}
              className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                theme === "dark"
                  ? "text-white"
                  : "text-indigo-600"
              }`}
            >
              {post.title}
            </motion.h2>

            <p className="text-sm text-gray-600 dark:text-gray-300/90 line-clamp-3 mb-6">
              {post.excerpt || post.content.substring(0, 150) + "..."}
            </p>

            {/* Footer Section */}
            <div className="mt-auto space-y-4">
              {author && (
                <div className="flex items-center justify-between pt-4 border-t border-purple-500/10 group-hover:border-purple-500/20">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      {author.image ? (
                        <img
                          src={author.image}
                          alt={author.name}
                          className="h-10 w-10 rounded-full ring-2 ring-violet-500/50 group-hover:ring-violet-400 object-cover shadow-lg transition-all duration-300"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-violet-500/20 ring-2 ring-violet-500/50 group-hover:ring-violet-400 flex items-center justify-center transition-all duration-300">
                          <BiUser className="h-5 w-5 text-violet-400" />
                        </div>
                      )}
                      <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
                    </motion.div>
                    <div>
                      <span className={`font-medium transition-colors duration-300 ${
                        theme === "dark"
                          ? "text-white"
                          : "text-indigo-600"
                      }`}>
                        {author.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <BiCommentDetail className="h-3.5 w-3.5" />
                          {commentCount} comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
