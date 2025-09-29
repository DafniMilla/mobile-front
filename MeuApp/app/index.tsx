import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login"; 
    }
  }, []);

  return null;
}
