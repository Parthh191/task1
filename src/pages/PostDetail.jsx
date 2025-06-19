import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { FiClock, FiCalendar, FiMessageCircle } from "react-icons/fi";
import { getPost, getProfile, getComments, addComment } from "../service/api";
import Comment from "../components/Comment";
import Loader from "../components/Loader";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const [postData, commentsData] = await Promise.all([
          getPost(id),
          getComments(id),
        ]);

        setPost(postData.data);
        setComments(commentsData.data);

        // Fetch author details after we have the post
        const authorData = await getProfile(postData.data.authorId);
        setAuthor(authorData.data);
      } catch (error) {
        setError("Failed to fetch post details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const comment = {
        postId: parseInt(id),
        userId: 1, // Using hardcoded userId as specified
        text: newComment,
        createdAt: new Date().toISOString(),
      };

      const response = await addComment(comment);
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const readTime = Math.max(1, Math.ceil((post?.content?.split(" ").length || 0) / 200));

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white p-2 sm:p-6"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-xl sm:rounded-3xl bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-1 sm:p-1.5 shadow-2xl shadow-purple-500/10"
        >
          <div className="relative overflow-hidden rounded-lg sm:rounded-2xl bg-gray-900/95 backdrop-blur-lg">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              className="relative h-64 sm:h-96 overflow-hidden"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            </motion.div>

            <div className="relative p-4 sm:p-8 -mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-400 bg-clip-text text-transparent leading-tight"
                >
                  {post.title}
                </motion.h1>

                {author && (
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <div className="flex items-center space-x-4">
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        src={author.image}
                        alt={author.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-2 ring-purple-500/50 object-cover shadow-lg shadow-purple-500/20"
                      />
                      <div>
                        <h3 className="font-medium text-xl sm:text-2xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                          {author.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-400 text-xs sm:text-sm mt-2">
                          <span className="flex items-center gap-1 sm:gap-2 hover:text-purple-400 transition-colors">
                            <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {dayjs(post.createdAt).format("MMMM D, YYYY")}
                          </span>
                          <span className="flex items-center gap-1 sm:gap-2 hover:text-purple-400 transition-colors">
                            <FiClock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {readTime} min read
                          </span>
                          <span className="flex items-center gap-1 sm:gap-2 hover:text-purple-400 transition-colors">
                            <FiMessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            {comments.length} comments
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="prose prose-sm sm:prose-xl prose-invert max-w-none prose-headings:text-purple-300 prose-a:text-pink-400 prose-strong:text-indigo-300"
                >
                  {post.content}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-12"
        >
          <div className="relative bg-gradient-to-br from-purple-900/30 via-fuchsia-900/30 to-pink-900/30 p-4 sm:p-8 rounded-xl sm:rounded-3xl backdrop-blur-lg border border-purple-500/20 shadow-2xl shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-fuchsia-500/5 to-pink-500/5 rounded-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent">
                Comments ({comments.length})
              </h2>

              <form onSubmit={handleAddComment} className="mb-6 sm:mb-10">
                <div className="relative group">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none backdrop-blur-lg border border-purple-500/20 transition-all duration-300 group-hover:border-purple-500/40 shadow-inner text-sm sm:text-base"
                    rows="3"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(147, 51, 234, 0.9)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!newComment.trim()}
                  className="mt-3 sm:mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white rounded-lg sm:rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 text-sm sm:text-base w-full sm:w-auto"
                >
                  Post Comment
                </motion.button>
              </form>

              <motion.div 
                className="space-y-6"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostDetail;
