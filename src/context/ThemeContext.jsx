import { createContext, useEffect, useState, useContext } from "react";

// 1. إنشاء الـ Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 2. التحقق من تفضيلات النظام أو التخزين المحلي
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // إذا لم يكن هناك ثيم محفوظ، نتحقق من إعدادات جهاز المستخدم
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // 3. دالة تبديل الثيم
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // 4. تطبيق التغييرات على الـ DOM وحفظها
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5. Custom Hook لتسهيل الاستدعاء في أي مكان
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
