import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPosts, searchPosts } from "../service/api";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPosts = async () => {
      const results = await searchPosts(posts, searchTerm);
      setFilteredPosts(results);
    };
    filterPosts();
  }, [searchTerm, posts]);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-blog-dark text-white py-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Mini Blog Portal
          </motion.h1>
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 rounded-2xl bg-gray-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-purple-500/20 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <p className="text-xl text-gray-400">
              No posts found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
