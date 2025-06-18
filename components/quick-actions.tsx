import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, MessageSquare } from "lucide-react";

export default function QuickActions() {
  return (
    <Card className="shadow-sm border-0" style={{ backgroundColor: "#FFFFFF" }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold" style={{ color: "#063852" }}>
          Quick Actions
        </CardTitle>
        <CardDescription style={{ color: "#636466" }}>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start h-12 border-2 hover:shadow-md transition-all duration-200"
            style={{ borderColor: "#1E9ADF", color: "#063852" }}
          >
            <Calendar className="h-5 w-5 mr-3" style={{ color: "#1E9ADF" }} />
            <span>Schedule Call</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-12 border-2 hover:shadow-md transition-all duration-200"
            style={{ borderColor: "#1E9ADF", color: "#063852" }}
          >
            <FileText className="h-5 w-5 mr-3" style={{ color: "#1E9ADF" }} />
            <span>Submit Request</span>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-12 border-2 hover:shadow-md transition-all duration-200"
            style={{ borderColor: "#1E9ADF", color: "#063852" }}
          >
            <MessageSquare className="h-5 w-5 mr-3" style={{ color: "#1E9ADF" }} />
            <span>Ask Question</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 