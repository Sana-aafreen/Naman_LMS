import React from "react";
import { useAuth } from "@/contexts/AuthContext";

interface NavItem {
  id: string;
  icon: string;
  label: string;
  badge?: string;
  section: string;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { id: "dashboard", icon: "🏠", label: "Dashboard", section: "Main" },
  { id: "courses", icon: "📚", label: "Courses", badge: "12", section: "Main" },
  { id: "training", icon: "🎓", label: "Training Material", section: "Main" },
  { id: "progress", icon: "📈", label: "My Progress", section: "Main" },
  { id: "leaves", icon: "📅", label: "Leave Management", section: "Workplace" },
  { id: "holidays", icon: "🎉", label: "Holiday Calendar", section: "Workplace" },
  { id: "projects", icon: "📋", label: "Projects", section: "Workplace" },
  { id: "medical", icon: "🏥", label: "Medical & Insurance", section: "Workplace" },
  { id: "ai", icon: "🤖", label: "AI Assistant", section: "AI & Tools" },
  { id: "sop", icon: "📄", label: "SOP Library", section: "AI & Tools" },
  { id: "admin", icon: "⚙️", label: "Admin Dashboard", section: "Administration", adminOnly: true },
];

interface SidebarProps {
  activePage: string;
  onNavigate: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { user, logout } = useAuth();
  const isAdminOrManager = user?.role === "Admin" || user?.role === "Manager";

  const sections = ["Main", "Workplace", "AI & Tools", ...(isAdminOrManager ? ["Administration"] : [])];

  return (
    <div className="w-[220px] flex-shrink-0 bg-card border-r border-border overflow-y-auto flex flex-col">
      {sections.map(section => (
        <div key={section} className="mb-1">
          <div className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase px-[18px] pt-2 pb-1">
            {section}
          </div>
          {navItems
            .filter(item => item.section === section && (!item.adminOnly || isAdminOrManager))
            .map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-2.5 px-[18px] py-2 text-[13px] border-l-[2.5px] transition-all text-left ${
                  activePage === item.id
                    ? "bg-saffron-light text-saffron border-l-saffron font-semibold"
                    : "text-muted-foreground border-l-transparent hover:bg-secondary"
                }`}
              >
                <span className="text-[15px] w-5 text-center flex-shrink-0">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span className="ml-auto text-[10px] px-[7px] py-0.5 rounded-full bg-saffron text-primary-foreground font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
        </div>
      ))}

      <div className="mt-auto p-[18px] border-t border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-[13px] font-bold text-primary-foreground flex-shrink-0">
            {user?.initials}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium truncate">{user?.name}</div>
            <div className="text-[11px] text-muted-foreground">{user?.role}</div>
          </div>
          <button
            onClick={logout}
            className="ml-auto text-[11px] text-muted-foreground px-2 py-1 rounded-md border border-border hover:text-maroon hover:border-maroon transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
