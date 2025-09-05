import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "home",
};

export default function Home() {
  return <HomeClient />;
}
