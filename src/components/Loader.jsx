import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const Loader = ({ fullScreen = false }) => {
  const { theme } = useTheme();
  
  const SpinnerComponent = (
    <motion.div
      animate={{
        rotate: 360,
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
      className="relative w-16 h-16 rounded-full border-4 border-purple-300/30 border-t-purple-500 dark:border-purple-500/30 dark:border-t-blog-primary shadow-lg shadow-purple-500/20"
    />
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blog-light dark:bg-dark-gradient relative">
        <div className="hidden dark:block absolute inset-0 bg-dark-glow opacity-50"></div>
        {SpinnerComponent}
      </div>
    );
  }

  return SpinnerComponent;
};

export default Loader;
