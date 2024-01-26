// src/components/Layout.tsx
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import Home from "@/views/Home";
import Game from "./views/Game";
import { Save } from "lucide-react";
import Profile from "./views/Profile";
import logo from "./assets/logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

const sidebarItems = [
  {
    title: "Home",
    href: "/home",
    component: Home,
  },
  {
    title: "Game",
    href: "/game",
    component: Game, // change this to Game when ready
  },
  {
    title: "Save",
    href: "/save",
    component: Save,
  },
  {
    title: "Profile",
    href: "/profile",
    component: Profile,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex">
      <div className="h-full bg-sidebar_bg drop-shadow-xl">
        <img src={logo} alt="logo" className="w-64 h-64 mx-30" />
        <Sidebar items={sidebarItems} />
      </div>
      <div className="flex-1 flex flex-col space-y-4">
        <div className="h-1/4 bg-theme flex justify-between ">
          <div className="flex flew-row my-8 mx-2 p-2.5 ">
            <Avatar className="my-2 mx-2">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-white sm">User</p>
          </div>
          <Input
            placeholder="Search"
            className="mx-auto my-auto w-1/2 rounded-lg shadow-lg"
          />
        </div>
        <Routes>
          {sidebarItems.map((item) => (
            <Route
              key={item.href}
              path={item.href}
              element={<item.component />}
            />
          ))}
          {children}
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
