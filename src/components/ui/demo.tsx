"use client";

import { useState, useEffect, FC } from "react";
import { Folder } from "@/components/ui/folder";

const DemoOne: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const darkMode = mediaQuery.matches;
      setIsDarkMode(darkMode);
      document.documentElement.classList.toggle("dark", darkMode);
    };
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const folderThemeColor = isDarkMode ? "#FFFFFF" : "#000000";
  const folderSizeProp: number = 2;

  return (
    <div
      className={`flex flex-col w-full min-h-screen justify-center items-center p-4 ${
        isDarkMode ? "bg-black" : "bg-white"
      } transition-colors duration-300`}
    >
      <div
        style={{
          width: "auto",
          height: "500px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Folder size={folderSizeProp} color={folderThemeColor} />
      </div>

      <p
        className={`text-center text-sm mt-10 ${
          isDarkMode ? "text-neutral-400" : "text-neutral-600"
        }`}
      >
        Click the folder to open/close. Hover papers when open.
      </p>
    </div>
  );
};

export { DemoOne };

