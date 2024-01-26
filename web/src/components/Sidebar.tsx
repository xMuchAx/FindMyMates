import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 pb-12 bg-sidebar_bg",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          variant="ghost"
          className={
            item.href === window.location.pathname
              ? "bg-btn_hover w-48  space-y-4 rounded-xl px-4 py-2.5 transition duration-200 ease-in-out"
              : "hover:bg-btn_hover w-48  space-y-4 px-4 py-2.5 hover:underline "
          }
        >
          <a key={item.href} href={item.href}>
            {item.title}
          </a>
        </Button>
      ))}
    </nav>
  );
}
