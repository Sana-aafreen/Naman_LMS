import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Courses from "@/pages/Courses";
import AIAssistant from "@/pages/AIAssistant";
import TrainingMaterial from "@/pages/TrainingMaterial";
import LeaveManagement from "@/pages/LeaveManagement";
import Projects from "@/pages/Projects";
import SOPLibrary from "@/pages/SOPLibrary";
import HolidayCalendar from "@/pages/HolidayCalendar";
import Medical from "@/pages/Medical";
import MyProgress from "@/pages/MyProgress";
import AdminDashboard from "@/pages/AdminDashboard";

const pages: Record<string, React.FC> = {
  dashboard: Dashboard,
  courses: Courses,
  ai: AIAssistant,
  training: TrainingMaterial,
  leaves: LeaveManagement,
  projects: Projects,
  sop: SOPLibrary,
  holidays: HolidayCalendar,
  medical: Medical,
  progress: MyProgress,
  admin: AdminDashboard,
};

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  if (!isAuthenticated) return <Login />;

  const PageComponent = pages[activePage] || Dashboard;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <PageComponent />
        </main>
      </div>
    </div>
  );
};

export default Index;
