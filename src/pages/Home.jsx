import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, searchPosts } from "../service/api";
import BlogCard from "../components/BlogCard";
import { useLoading } from "../context/LoadingContext";
import { useImage } from "../context/ImageContext";
import Loader from "../components/Loader";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(location.state?.error || null);
  const { startLoading, stopLoading } = useLoading();
  const { preloadImages } = useImage();
  const [isReady, setIsReady] = useState(false);

  // Clear error from location state after displaying
  useEffect(() => {
    if (location.state?.error) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const loadData = async () => {
      startLoading();
      try {
        if (!isReady) {
          const response = await getPosts();
          const postsData = response.data;

          const imageUrls = postsData.map((post) => post.thumbnail);
          await preloadImages(imageUrls);
          setPosts(postsData);
          setFilteredPosts(postsData);
          setIsReady(true);
        }
      } catch (error) {
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        stopLoading();
      }
    };

    loadData();
  }, [startLoading, stopLoading, preloadImages, isReady]);

  useEffect(() => {
    const filterPosts = async () => {
      const results = await searchPosts(posts, searchTerm);
      setFilteredPosts(results);
    };
    filterPosts();
  }, [searchTerm, posts]);

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!isReady) return <Loader fullScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-blog-light dark:bg-blog-dark text-blog-light-text dark:text-white py-6 px-4 sm:px-6 lg:px-8"
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
              className="w-full p-4 rounded-2xl bg-blog-light-secondary dark:bg-gray-900/80 text-blog-light-text dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 border border-purple-500/20 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30"
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
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No posts found matching your search.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;
