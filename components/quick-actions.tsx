"use client"

import { Button } from "@/components/ui/button";
import { Calendar, FileText, MessageSquare, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { WidgetManagementSlidePanel } from "./widget-management-slide-panel";

export default function QuickActions() {
  const pathname = usePathname();
  
  // Function to get page title based on current path
  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "My Dashboard";
      case "/dashboard/projects":
        return "Projects";
      case "/dashboard/people":
        return "People";
      case "/dashboard/meetings":
        return "Meetings";
      case "/dashboard/documents":
        return "Documents & Vault";
      case "/dashboard/reports":
        return "Reports";
      case "/dashboard/resources":
        return "Resources & Education";
      case "/dashboard/billing":
        return "Billing";
      case "/dashboard/messages":
        return "Messages";
      case "/dashboard/timeline":
        return "Timeline";
      default:
        // Handle project detail pages
        if (pathname.startsWith("/dashboard/projects/")) {
          return "Project Details";
        }
        if (pathname.startsWith("/dashboard/documents/")) {
          return "Document Details";
        }
        return "Dashboard";
    }
  };

  return (
    <div className="w-full border-b" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6EBED" }}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold" style={{ color: "#063852" }}>
              {getPageTitle()}
            </h2>
          </div>
          <div className="flex space-x-3">
            {pathname === "/dashboard" && (
              <WidgetManagementSlidePanel />
            )}
            <Button
              variant="outline"
              className="justify-start h-10 border hover:shadow-md transition-all duration-200"
              style={{ borderColor: "#1E9ADF", color: "#063852" }}
            >
              <FileText className="h-4 w-4 mr-2" style={{ color: "#1E9ADF" }} />
              <span>Submit Request</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 