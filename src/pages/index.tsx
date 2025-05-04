import React, { useState, useEffect, ReactNode,  } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Edit2,
  Trash2,
  Award,
  TrendingUp,
  X,
  PlusCircle,
  BarChart2,
  Calendar,
  Settings2,
  User,
  Eye,
  EyeOff,
  Save,
  Mail,
  Key,
  UserPlus,
  Clock,
  ArrowRight,
  Droplets,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
  AreaChart,
} from "recharts";

// ========== Types ==========
interface User {
  name: string;
  email: string;
}

interface Habit {
  name: string;
  goal: [number, number];
  progress: number;
  streak: number;
}

interface ProgressData {
  date: string;
  progress: number;
}

// ========== Navbar ==========


const Navbar = ({
  onSettings,
}: {
  onSettings: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const textColor = "dark:text-gray-300 text-gray-700";
  const hoverTextColor = "dark:hover:text-blue-400 hover:text-blue-600";
  const bgColor = isScrolled
    ? 
       "dark:bg-gray-900/95 bg-white/95"
    : 
    "dark:bg-gray-900 bg-white";
  const shadow = isScrolled ? "shadow-md backdrop-blur-sm" : "";

  const menuItems = [
    // { icon: <Layout size={18} />, label: "Dashboard", onClick: () => {} },
    // { icon: <BarChart2 size={18} />, label: "Analytics", onClick: () => {} },
    // { icon: <Calendar size={18} />, label: "Calendar", onClick: () => {} },
    { icon: <Settings2 size={18} />, label: "Settings", onClick: onSettings },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 mb-1 ${bgColor} ${shadow}`}
    >
      {/* Logo */}
      <motion.div
        className="flex items-center gap-2 font-bold text-xl"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: 0 }}
          className={`text-blue-600  dark:text-blue-400`}
        >
          <BarChart2 size={24} />
        </motion.div>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          HabitTracker
        </span>
      </motion.div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        {menuItems.map((item, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-1.5 font-medium ${textColor} ${hoverTextColor}`}
            onClick={item.onClick}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.button>
        ))}

        {/* User Profile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className={`ml-3 flex items-center gap-2 font-medium ${textColor}`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-md dark:bg-gray-800 bg-gray-100`}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
              className={`w-full h-0.5 rounded-full dark:bg-gray-300 bg-gray-700`}
            />
            <motion.div
              animate={{ opacity: isMenuOpen ? 0 : 1 }}
              className={`w-full h-0.5 rounded-full dark:bg-gray-300 bg-gray-700`}
            />
            <motion.div
              animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
              className={`w-full h-0.5 rounded-full dark:bg-gray-300 bg-gray-700`}
            />
          </div>
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`absolute top-16 left-0 right-0 md:hidden border-t py-2 shadow-lg dark:bg-gray-900 dark:border-gray-800 bg-white border-gray-100`}
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              className={`w-full flex items-center gap-2 px-6 py-3 ${textColor}`}
              onClick={() => {
                item.onClick();
                setIsMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          ))}
          <div className="border-t my-2 border-gray-200 dark:border-gray-700"></div>
        
        </motion.div>
      )}
    </motion.nav>
  );
};
//=========== Modal ==============

const Modal = ({
  isOpen,
  onClose,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOutsideClick = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  // Calculate modal width based on size prop
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-4xl",
  };

  const modalWidth = sizeClasses[size];

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOutsideClick) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            className={`${modalWidth} w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-10 mx-4 overflow-hidden`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            

            {/* Content */}
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
            {showCloseButton && (
              <div className="flex items-center justify-between px-6 pt-4">
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {""}
                </p>

                
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                  >
                    <X size={20} />
                  </motion.button>
              
              </div>
            )}
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

//========== Settings ==========
const Settings = ({
  user,
  setUser,
}: {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate saving delay
    setTimeout(() => {
      setUser({ name: username, email: email });
      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 2 seconds
      setTimeout(() => setSaveSuccess(false), 2000);
    }, 600);
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" },
    tap: { scale: 0.98 },
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
    saving: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.6 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center mb-8">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="bg-blue-500 p-3 rounded-lg mr-4"
        >
          <User size={24} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Account Settings
        </h2>
      </div>

      {/* User ID */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-gray-400" />
          </div>
          <motion.input
            whileFocus="focus"
            whileTap="tap"
            variants={inputVariants}
            type="text"
            className="pl-10 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-gray-400" />
          </div>
          <motion.input
            whileFocus="focus"
            whileTap="tap"
            variants={inputVariants}
            type="email"
            className="pl-10 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      {/* Password Section */}
      <div className="mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowPassword(!showPassword)}
          className="flex items-center text-blue-600 dark:text-blue-400 font-medium"
        >
          <Key size={16} className="mr-2" />
          {showPassword ? "Hide" : "Change"} Password
        </motion.button>

        {showPassword && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key size={18} className="text-gray-400" />
              </div>
              <motion.input
                whileFocus="focus"
                whileTap="tap"
                variants={inputVariants}
                type={showPasswordText ? "text" : "password"}
                className="pl-10 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPasswordText(!showPasswordText)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  type="button"
                >
                  {showPasswordText ? <EyeOff size={20} /> : <Eye size={20} />}
                </motion.button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Password must be at least 8 characters long
            </p>
          </motion.div>
        )}
      </div>

      {/* Save Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={isSaving ? "saving" : ""}
        onClick={handleSave}
        disabled={isSaving}
        className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg py-3 px-4 font-medium shadow-md transition duration-200"
      >
        {isSaving ? (
          "Saving..."
        ) : saveSuccess ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center"
          >
            Saved Successfully!
          </motion.span>
        ) : (
          <span className="flex items-center">
            <Save size={18} className="mr-2" />
            Save Changes
          </span>
        )}
      </motion.button>

      {/* Settings Categories */}
      {/* <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
          Additional Settings
        </h3>
        <div className="space-y-3">
          {["Notifications", "Privacy", "Security", "Theme Preferences"].map(
            (item) => (
              <motion.div
                key={item}
                whileHover={{ x: 5 }}
                className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
              >
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.div>
            )
          )}
        </div>
      </div> */}
    </motion.div>
  );
};
// ========== sign up ==========
const Signup = () => {
  const [name, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      localStorage.setItem("userDetails", JSON.stringify({ name, email }));
      localStorage.setItem("userHabits", JSON.stringify([]));
      localStorage.setItem(
        "basicHabits",
        JSON.stringify([
          {
            name: "Sleep",
            goal: [7, 9],
            progress: 0,
            streak: 0,
          },
          {
            name: "Water Intake",
            goal: [3, 5],
            progress: 0,
            streak: 0,
          },
          {
            name: "Screen Time",
            goal: [2, 4],
            progress: 0,
            streak: 0,
          },
        ])
      );
      location.reload();
    }, 600);
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" },
    tap: { scale: 0.98 },
  };

  const buttonVariants = {
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
    submitting: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 0.6 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-"
    >
      <div className="flex items-center mb-8 justify-center">
        <motion.div
          whileHover={{ rotate: 10 }}
          className="bg-blue-500 p-3 rounded-lg mr-4"
        >
          <UserPlus size={24} className="text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Create Account
        </h2>
      </div>

      <form onSubmit={handleSignUp}>
        {/* User ID */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <motion.input
              whileFocus="focus"
              whileTap="tap"
              variants={inputVariants}
              type="text"
              className="pl-10 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <motion.input
              whileFocus="focus"
              whileTap="tap"
              variants={inputVariants}
              type="email"
              className="pl-10 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key size={18} className="text-gray-400" />
            </div>
            <motion.input
           
              whileFocus="focus"
              whileTap="tap"
              variants={inputVariants}
              type={showPassword ? "text" : "password"}
              className="pl-10 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              pattern=".{8,}"
              placeholder="Create a secure password"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </motion.button>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Password must be at least 8 characters long
          </p>
        </div>

        {/* Sign Up Button */}
        <motion.button
          type="submit"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          animate={isSubmitting ? "submitting" : ""}
          disabled={isSubmitting}
          className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg py-3 px-4 font-medium shadow-md transition duration-200"
        >
          {isSubmitting ? (
            "Creating Account..."
          ) : (
            <span className="flex items-center">
              <UserPlus size={18} className="mr-2" />
              Create Account
            </span>
          )}
        </motion.button>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
            >
              Sign In
            </motion.a>
          </p>
        </div>
      </form>

      {/* Social Sign Up Options */}
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {["Google", "Apple", "GitHub"].map((provider) => (
            <motion.button
              key={provider}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              type="button"
              className="flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {provider}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ========== Landing Page ==========
const LandingPage = () => {
  const [isSignupOpen, setSignupOpen] = useState(false);

  // Features data
  const features = [
    {
      icon: <Droplets size={24} className="text-blue-500" />,
      title: "Water Intake",
      description: "Stay hydrated by tracking your daily water consumption",
    },
    {
      icon: <Clock size={24} className="text-purple-500" />,
      title: "Screen Time",
      description: "Be mindful of your device usage throughout the day",
    },
    {
      icon: <Calendar size={24} className="text-green-500" />,
      title: "Daily Consistency",
      description: "Build streaks and maintain your routine",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      <Modal
        showCloseButton
        isOpen={isSignupOpen}
        onClose={() => setSignupOpen(false)}
      >
        <Signup />
      </Modal>

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        {/* Navigation */}
        <nav className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart2 size={28} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HabitTracker
            </span>
          </div>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSignupOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md"
            >
              Sign Up
            </motion.button>
          </div>
        </nav>

        {/* Hero Content */}
        <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-6 py-16 lg:py-24">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
            >
              Track Your Habits
              <br />
              <span className="text-blue-600 dark:text-blue-400">
                Like a Pro
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Build better routines, establish consistency, and achieve your
              goals with our intuitive habit tracking platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSignupOpen(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium shadow-lg flex items-center justify-center"
              >
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg font-medium shadow-md hover:shadow-lg"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -z-10 top-10 left-10 w-full h-full bg-blue-200 dark:bg-blue-900 rounded-2xl transform rotate-3"></div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[3, 8, 4, 10].map((value, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {features[i]?.title || "Habit"}
                        </span>
                        <span className="text-blue-500 font-bold">
                          {value}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value*10}%` }}
                          transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                          className="bg-blue-500 rounded-full h-2"
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
               
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Everything You Need to Build Better Habits
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Our comprehensive tracking tools help you stay on top of daily
                habits that matter most to your wellbeing.
              </motion.p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="inline-block p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-6"
            >
              Start Building Better Habits Today
            </motion.h2>
           
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSignupOpen(true)}
              className="px-8 py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg font-medium shadow-lg"
            >
              {`Get Started — It's Free`}
            </motion.button>
          </div>
        </section>

        {/* Footer */}
      </div>
    </>
  );
};
// ========== Graph Section ==========
const ProgressGraph = ({
  data,
  setGraphOpen,
  isDarkMode,
}: {
  data: ProgressData[];
  setGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode: boolean;
}) => {
  const gridColor = isDarkMode ? "#444" : "#ccc";
  const xAxisColor = isDarkMode ? "#ddd" : "#333";
  const localData = data.map(d => ({
    date: d.date.slice(0, 3), 
    progress: d.progress
  }));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      onHoverStart={() => setGraphOpen(true)}
      onHoverEnd={() => setGraphOpen(false)}
      className={`dark:bg-gray-800 bg-white dark:text-blue-300 text-blue-500 rounded-lg shadow-lg p-4 mt-2 z-10 absolute w-80`}
    >
      <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <TrendingUp size={18} />
        Weekly Progress
      </h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={localData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: xAxisColor }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: xAxisColor }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#2d3748" : "white",
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                color: isDarkMode ? "#cbd5e0" : "#4a5568",
              }}
              labelStyle={{
                fontWeight: "bold",
                color: isDarkMode ? "#cbd5e0" : "#666",
              }}
            />
            <Area
              type="monotone"
              dataKey="progress"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorValue)"
              strokeWidth={2}
              activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// ========== Habit Card ==========

const HabitCard = ({
  habit,
  setHabits,
  basic,
  isDarkMode,
}: {
  habit: Habit;
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  basic?: boolean;
  isDarkMode:boolean;
}) => {
  const [isGraphOpen, setGraphOpen] = useState<boolean>(false);
  const[isDeleting,setIsDeleting] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(habit.name);
  const [editedMinGoal, setEditedMinGoal] = useState<number>(habit.goal[0]);
  const [editedMaxGoal, setEditedMaxGoal] = useState<number>(habit.goal[1]);

  const graphData = localStorage.getItem(`habit-${habit.name}`)
  const [data, setData] = useState<ProgressData[]>(JSON.parse(graphData?graphData:'[]'));
  const progressData = [
    { date: "Mon May 01 2025", progress: 5 },
    { date: "Tue May 02 2025", progress: 7 },
    { date: "Wed May 03 2025", progress: 6 },
    { date: "Thu May 04 2025", progress: 8 },
    { date: "Fri May 05 2025", progress: 4 },
    { date: "Sat May 06 2025", progress: 9 },
    { date: "Sun May 07 2025", progress: 7 },
  ];
  
  const today = new Date();
  const setProgress = (progress: number) => {
    const name = habit.name;
    setData((prevData) => {
      const todayStr = today.toDateString();
      const existingIndex = prevData.findIndex(
        (item) => item.date === todayStr
      );

      if (existingIndex !== -1) {
        const updated = [...prevData];
        updated[existingIndex] = { date: todayStr, progress: progress };
        return updated;
      } else {
        return [...prevData, { date: todayStr, progress: progress }];
      }
    });
// setData([...data,{date:today.toDateString(),progress}])
// console.log(data);
    localStorage.setItem(`habit-${habit.name}`, JSON.stringify(data));
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.name === name ? { ...habit, progress: progress } : habit
      )
    );
  };

  const deleteHabit = () => {
const name = habit.name
    setHabits((prev) => prev.filter((habit) => habit.name !== name));
    localStorage.removeItem(`habit-${habit.name}`)
  };

  const saveEdits = () => {
    setHabits((prevHabits) =>
      prevHabits.map((h) =>
        h.name === habit.name
          ? {
              ...h,
              name: editedName,
              goal: [editedMinGoal, editedMaxGoal] as [number, number],
            }
          : h
      )
    );
    setIsEditing(false);
  };

  const progressPercentage = Math.min(
    100,
    (habit.progress / habit.goal[1]) * 100
  );
  const isGoalAchieved =
    habit.progress >= habit.goal[0] && habit.goal[1] >= habit.progress;
  const isOverLoaded = habit.progress > habit.goal[1];

  return (
    <motion.div
      className="mb-4 w-full"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >{<Modal showCloseButton
                isOpen = {isDeleting}
                onClose={()=>setIsDeleting(false)}
                
                >
                  <div className="text-center">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Confirm Deletion?</h2>
        </motion.div>
        
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this habit?
            <br />
            <span className="text-red-500 font-medium">Note: Your progress will be lost.</span>
          </p>
        </motion.div>
        
        <div className="flex justify-center space-x-4">
          <motion.button
            
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            onClick={() => setIsDeleting(false)}
          >
            Cancel
          </motion.button>
          
          <motion.button
            
            className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
            onClick={() => {
              deleteHabit()
              setIsDeleting(false);
            }}
          >
            Delete
          </motion.button>
        </div>
      </div>
                  </Modal>}
      <motion.div
        className={`bg-gradient-to-r bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-6 shadow-lg rounded-xl w-full `}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setGraphOpen(true)}
        onMouseLeave={() => setGraphOpen(false)}
      >
        {!isEditing ? (
          <>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold">{habit.name}</h3>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 size={18} />
                </motion.button>
                {!basic && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="text-red-500 hover:text-red-700"
                    onClick={() => setIsDeleting(true)}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                )}
              </div>
            </div>

            <div className={`flex justify-between mb-2 text-sm text-gray-600 dark:text-gray-400`}>
              <p>
                Goal: <span className="font-medium">{habit.goal[0]}</span> -{" "}
                <span className="font-medium">{habit.goal[1]}</span>
              </p>
              <p>
                Progress: <span className="font-medium">{habit.progress}</span>
              </p>
            </div>

            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${
                    isGoalAchieved
                      ? "bg-green-500"
                      : isOverLoaded
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="flex items-center mb-4">
              <Award
                size={18}
                className={
                  habit.streak >= 3 ? "text-yellow-500" : "text-gray-400"
                }
              />
              <p className="ml-2 text-sm">
                <span className="font-bold">{habit.streak}</span> day streak
                {habit.streak >= 7 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="ml-1"
                  >
                    🔥
                  </motion.span>
                )}
              </p>
            </div>

            <input
              type="range"
              min={0}
              max={24}
              value={habit.progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              className={`h-2 rounded-full w-full`}
            />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-2"
          >
            <h3 className="text-lg font-semibold mb-3">Edit Habit</h3>
            <div className="space-y-3">
              <div>
                <label className={`block text-sm  font-mediummb-1`}>
                  Habit Name
                </label>
                <input
                  readOnly={basic}
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className={`block text-sm  font-mediummb-1`}>
                    Min Goal
                  </label>
                  <input
                    type="number"
                    value={editedMinGoal}
                    onChange={(e) => setEditedMinGoal(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium  mb-1">
                    Max Goal
                  </label>
                  <input
                    type="number"
                    value={editedMaxGoal}
                    onChange={(e) => setEditedMaxGoal(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdits}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isGraphOpen && (
          <ProgressGraph
            data={data.length>=7?data:progressData}
            setGraphOpen={setGraphOpen}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ========= Toast ============

// const Toast = ({
//   message,
//   isDark,
//   onClose,
// }: {
//   message: string;
//   isDark:boolean;
//   onClose: () => void;
// }) => {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onClose();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onClose]);

//   const bgColor = isDark?'bg-gray-800':'bg-gray-100'
//   const textColor = isDark?'text-gray-100':'text-gray-800'

//   const bgColors = {
//     success: "bg-green-50 border-green-200",
//     error: "bg-red-50 border-red-200",
//     info: "bg-blue-50 border-blue-200",
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg border ${bgColor}`}
//     >
//       <div className="mr-3"><Check size={20} className={textColor} />,</div>
//       <p className={"font-medium "+textColor}>{message}</p>
//       <button onClick={onClose} className="ml-4">
//         <X size={16} />
//       </button>
//     </motion.div>
//   );
// };

// ========== AddHabit ============
const AddHabit = ({
  habits,
  setHabits,
}: {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}) => {
  const [showHabitForm, setShowHabitForm] = useState<boolean>(false);
  const [habitName, setHabitName] = useState<string>("");
  const [habitFrom, setHabitFrom] = useState<number>(1);
  const [habitTo, setHabitTo] = useState<number>(8);
  const [errors, setErrors] = useState<{ name?: string; goal?: string }>({});

  const bgColor = "dark:bg-gray-800 bg-gray-50";
  const textColor = "dark:text-gray-50 text-gray-800";

  // Form validation
  const validateForm = () => {
    const newErrors: { name?: string; goal?: string } = {};

    // Check if habit name is empty
    if (!habitName.trim()) {
      newErrors.name = "Habit name is required";
    }

    // Check if habit name already exists
    if (
      habits.some(
        (habit) => habit.name.toLowerCase() === habitName.toLowerCase().trim()
      )
    ) {
      newErrors.name = "Habit with this name already exists";
    }

    // Check if goal range is valid
    if (habitFrom >= habitTo) {
      newErrors.goal = "Maximum goal must be greater than minimum goal";
    }

    // Check if goals are within valid range (1-24 hours)
    if (habitFrom < 1 || habitFrom > 24 || habitTo < 1 || habitTo > 24) {
      newErrors.goal = "Goals must be between 1 and 24 hours";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddHabit = () => {
    if (!validateForm()) {
      return;
    }

    setHabits([
      ...habits,
      {
        name: habitName.trim(),
        goal: [habitFrom, habitTo],
        progress: 0,
        streak: 0,
      },
    ]);

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setHabitName("");
    setHabitFrom(1);
    setHabitTo(8);
    setShowHabitForm(false);
    setErrors({});
  };

  return (
    <>
      <motion.div className="mb-6" layout transition={{ duration: 0.3 }}>
        {!showHabitForm ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowHabitForm(true)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 px-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <PlusCircle size={20} />
            <span className="font-medium">Add New Habit</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${bgColor} ${textColor} rounded-xl shadow-lg p-6 border border-gray-100`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New Habit</h3>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Habit Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Habit Name
                </label>
                <input
                  type="text"
                  placeholder="Habit to track"
                  className={`w-full border ${
                    errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
                  } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={habitName}
                  onChange={(e) => {
                    setHabitName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Goal Range */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Goal Range (hours)
                </label>
                <div className="flex items-center space-x-3">
                  <div className="w-full">
                    <input
                      type="number"
                      placeholder="Minimum"
                      className={`w-full border ${
                        errors.goal
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={habitFrom}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setHabitFrom(Math.min(Math.max(1, value), 24));
                        if (errors.goal)
                          setErrors({ ...errors, goal: undefined });

                        // Automatically adjust habitTo if needed
                        if (value >= habitTo) {
                          setHabitTo(Math.min(value + 1, 24));
                        }
                      }}
                      min="1"
                      max="24"
                    />
                  </div>
                  <div>to</div>
                  <div className="w-full">
                    <input
                      type="number"
                      placeholder="Maximum"
                      className={`w-full border ${
                        errors.goal
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      } rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      value={habitTo}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setHabitTo(
                          Math.min(Math.max(habitFrom + 1, value), 24)
                        );
                        if (errors.goal)
                          setErrors({ ...errors, goal: undefined });
                      }}
                      min={habitFrom + 1}
                      max="24"
                    />
                  </div>
                </div>
                <p className="mt-1 text-xs">Range: 1-24 hours</p>
                {errors.goal && (
                  <p className="mt-1 text-sm text-red-600">{errors.goal}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAddHabit}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg py-3 px-4 font-medium shadow-md hover:shadow-lg transition-shadow mt-4 flex items-center justify-center gap-2"
              >
                <PlusCircle size={20} />
                <span>Create Habit</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

// ========== Footer ==========
const Footer = () => {

  return (
    <footer className={`dark:bg-gray-800 bg-gray-100 py-8 mt-6`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <BarChart2 size={24} className='dark:text-blue-400 text-blue-600' />
          <span className={`text-lg font-bold dark:text-white text-gray-900`}>HabitTracker</span>
        </div>
        <div className={`text-sm dark:text-gray-300 text-gray-600`}>
          © {new Date().getFullYear()} HabitTracker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};


// ========== Main App ==========

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [basicHabits, setBasicHabits] = useState<Habit[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const date = new Date();


const usePrefersDark = () => {
  const getPrefersDark = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [prefersDark, setPrefersDark] = useState(getPrefersDark);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setPrefersDark(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersDark;
};

  const isDarkMode = usePrefersDark();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const calculateStreak = (habitName: string) => {
    const rawData = localStorage.getItem(`habit-${habitName}`);
    if (!rawData) return 0;
    const progressByDate = JSON.parse(rawData);
    const dates = Object.keys(progressByDate)
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < dates.length; i++) {
      const currentDate = dates[i];
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      if (currentDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    const userHabits = localStorage.getItem("userHabits");
    const basicHabits = localStorage.getItem("basicHabits");

    if (!userDetails || !userHabits || !basicHabits) {
      return;
    }

    setUser(JSON.parse(userDetails));
    setHabits(JSON.parse(userHabits));
    setHabits((prevHabits) =>
      prevHabits.map((habit) => ({
        ...habit,
        streak: calculateStreak(habit.name),
      }))
    );

    setBasicHabits(JSON.parse(basicHabits));
    setBasicHabits((prevHabits) =>
      prevHabits.map((habit) => ({
        ...habit,
        streak: calculateStreak(habit.name),
      }))
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("userHabits", JSON.stringify(habits));
  }, [habits]);

  if (!user)
    return (
      <>
        <LandingPage />
        <Footer  />
      </>
    );
  const bgColor = 'dark:bg-indigo-950 bg-indigo-400';
  const bbgColorFrom = 'dark:from-gray-900 from-blue-50';
  const bbgColorTo = 'dark:to-gray-800 to-indigo-50';
  const textColor = 'dark:text-gray-200 text-gray-800';

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bbgColorFrom} ${bbgColorTo} p-6`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Modal
          showCloseButton
          closeOnOutsideClick
          isOpen={isSettingsOpen}
          onClose={() => setSettingsOpen(false)}
        >
          <Settings user={user} setUser={setUser} />
        </Modal>
        <div className="flex justify-between items-center mb-12">
          <Navbar
            onSettings={() => setSettingsOpen(true)}
          />
        </div>

        <motion.div
          className={`p-6 ${bgColor} rounded-xl shadow-lg mb-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-2xl font-semibold ${textColor}`}
              onClick={() => localStorage.clear()}
            >
              Welcome back, {user?.name || "User"}
            </h2>
            <span
              className={`font-bold dark:text-indigo-600 text-indigo-800`}
            >
              {date.toDateString()}
            </span>
          </div>
        </motion.div>

        <motion.div
          className={`p-6 ${bgColor} rounded-xl shadow-lg mb-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className={`text-xl font-semibold ${textColor} mb-4`}>
            Personal Stats
          </h2>
          <div className="gap-2 grid sm:grid-cols-1 lg:grid-cols-3">
            {basicHabits.map((habit, i) => (
              <HabitCard
                key={i}
                habit={habit}
                setHabits={setBasicHabits}
                isDarkMode={isDarkMode}
                basic
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className={`p-6 ${bgColor} rounded-xl shadow-lg`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className={`text-xl font-semibold ${textColor} mb-4`}>
            Your Habits
          </h2>
          <div className="gap-2 grid sm:grid-cols-1 lg:grid-cols-3">
            {habits.map((habit, i) => (<>
              <HabitCard
                key={i}
                habit={habit}
                setHabits={setHabits}
                isDarkMode={isDarkMode}
              /> </>
            ))}

            <AddHabit
              habits={habits}
              setHabits={setHabits}
            />
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default App;
