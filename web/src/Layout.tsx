// src/components/Layout.tsx
import { Routes, Route } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import Home from "@/views/Home";

const sidebarItems = [
  {
    title: "Home",
    href: "/home",
    component: Home,
  },
  {
    title: "Game",
    href: "/game",
    component: Home, // change this to Game when ready
  },
  {
    title: "Save",
    href: "/save",
    component: Home,
  },
  {
    title: "Profile",
    href: "/profile",
    component: Home,
  },
];

const Layout = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-1/4 bg-bg1 flex space-x-4 ">
        <div className="flex flex-col mb-3 px-2 ">
          {/* <div className="w-16 h-16">
            <Logo />
          </div> */}
          <p className="text-white text-2xl">User</p>
        </div>
        <Input
          placeholder="Search"
          className="mx-auto my-auto w-1/2 rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col space-y-8 h-full lg:flex-row lg:space-x-12 lg:space-y-0">
        <Sidebar items={sidebarItems} />
        <div className="flex-1 lg:max-w-2xl">
          <Routes>
            {sidebarItems.map((item) => (
              <Route
                key={item.href}
                path={item.href}
                element={<item.component />}
              />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
