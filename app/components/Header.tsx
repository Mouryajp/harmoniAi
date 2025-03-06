"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-between  gap-2 w-full mx-4 mt-2">
      <div className="text-xl font-bold cursor-pointer" onClick={()=>router.push("/")}>Harmoni.ai</div>
      <div className="flex justify-center  gap-2">
        <p className="font-bold">Theme:</p>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-12 h-6 flex items-center bg-secondary rounded-full p-1 transition duration-300 ease-in-out outline-1 outline-gray-950 cursor-pointer"
        >
          <div
            className={`w-5 h-5 bg-primary rounded-full shadow-md transform transition-all duration-300 ${
              theme === "dark" ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
