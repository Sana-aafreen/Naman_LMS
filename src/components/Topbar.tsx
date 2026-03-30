import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const Topbar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="h-[54px] bg-deep flex items-center px-5 gap-4 flex-shrink-0">
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-[15px]">🛕</div>
        <div className="text-sm font-bold text-primary-foreground">
          NamanDarshan <span className="text-saffron-mid font-normal text-[11px] ml-1">LMS</span>
        </div>
      </div>

      <div className="w-px h-6 bg-primary-foreground/10 flex-shrink-0" />

      <div className="flex-1 max-w-[360px] relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] opacity-40">🔍</span>
        <input
          type="text"
          placeholder="Search courses, SOPs, employees…"
          className="w-full py-[7px] pl-[34px] pr-3.5 bg-primary-foreground/5 border border-primary-foreground/10 rounded-full text-xs text-primary-foreground placeholder:text-primary-foreground/35 outline-none focus:border-saffron/50"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center cursor-pointer text-sm relative">
          🔔
          <div className="w-[7px] h-[7px] bg-saffron rounded-full absolute top-1.5 right-1.5 border-[1.5px] border-deep" />
        </div>
        <div className="flex flex-col items-end">
          <div className="text-xs font-semibold text-primary-foreground">{user?.name}</div>
          <div className="text-[10px] text-primary-foreground/45">{user?.role} · NamanDarshan</div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center text-xs font-bold text-primary-foreground cursor-pointer">
          {user?.initials}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
