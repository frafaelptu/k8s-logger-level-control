
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCircle } from "lucide-react";
import { getActuatorHealth } from "@/services/api";

interface NavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const [healthStatus, setHealthStatus] = useState<"UP" | "DOWN" | "UNKNOWN">("UNKNOWN");
  
  useEffect(() => {
    const checkHealth = async () => {
      const health = await getActuatorHealth();
      setHealthStatus(health?.status as "UP" | "DOWN" | "UNKNOWN" || "UNKNOWN");
    };
    
    checkHealth();
    
    // Check health status every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="container mx-auto mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-k8s-blue text-white p-2 rounded mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3c1.333.78 2.999 1.913 4 3.001 1.001-1.088 2.667-2.221 4-3.001"/>
              <path d="M12 3c-1.333.78-2.999 1.913-4 3.001-1.001-1.088-2.667-2.221-4-3.001"/>
              <path d="M12 21c-1.333-.78-2.999-1.913-4-3.001-1.001 1.088-2.667 2.221-4 3.001"/>
              <path d="M12 21c1.333-.78 2.999-1.913 4-3.001 1.001 1.088 2.667 2.221 4 3.001"/>
              <path d="M3 12h18"/>
              <path d="M12 3v18"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">K8s Loggers Manager</h1>
            <div className="flex items-center text-sm">
              {healthStatus === "UP" ? (
                <>
                  <CheckCircle size={14} className="mr-1 text-green-600" /> 
                  <span className="text-green-600">Service is healthy</span>
                </>
              ) : healthStatus === "DOWN" ? (
                <>
                  <AlertCircle size={14} className="mr-1 text-red-600" /> 
                  <span className="text-red-600">Service is down</span>
                </>
              ) : (
                <span className="text-gray-400">Checking health...</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="change-logs">Change Log Levels</TabsTrigger>
          <TabsTrigger value="view-changes">View Changed Packages</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Navigation;
