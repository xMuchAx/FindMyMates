import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  const location = useLocation();

  return (
    <nav className={cn("flex flex-col space-y-4 h-full", className)} {...props}>
      {items.map((item) => (
        <Link key={item.href} to={item.href}>
          <Button
            variant="ghost"
            className={
              item.href === location.pathname
                ? "bg-white mt-4 rounded-none  w-48 text-btn_hover  space-y-4 px-4 mx-20 py-4 justify-center shadow-inner shadow-xl "
                : " mt-4 rounded-none  w-48 text-btn_hover  space-y-4 px-4 mx-20 py-4 justify-center  shadow-none"
            }
          >
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  );
}
