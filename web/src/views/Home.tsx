import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import Logo from "@/assets/logo.svg";

// ...

const sidebarItems = [
  {
    title: "Home",
    href: "/home",
  },
  {
    title: "Index",
    href: "/index",
  },
  {
    title: "Save",
    href: "/save",
  },
  {
    title: "Profile",
    href: "/profile",
  },
];

const Home = () => {
  return <h2>Home</h2>;
};

export default Home;
