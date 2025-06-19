import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500 shadow-lg shadow-purple-500/20"
      />
    </div>
  );
};

export default Loader;
