
import { useState } from "react";
import { 
  LogLevelChangeRequest, 
  LogLevelChangeResponse, 
  ChangedPackage
} from "@/types/api";
import { changeLogLevel, getChangedPackages } from "@/services/api";
import LogLevelForm from "@/components/LogLevelForm";
import LogLevelResult from "@/components/LogLevelResult";
import ChangedPackagesList from "@/components/ChangedPackagesList";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const Index = () => {
  const [activeTab, setActiveTab] = useState("change-logs");
  const [changeResult, setChangeResult] = useState<LogLevelChangeResponse | null>(null);
  const [changedPackages, setChangedPackages] = useState<ChangedPackage[]>([]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isPackagesLoading, setIsPackagesLoading] = useState(false);

  // Handle log level change form submission
  const handleChangeLogLevel = async (request: LogLevelChangeRequest) => {
    setIsFormLoading(true);
    try {
      const response = await changeLogLevel(request);
      if (response) {
        setChangeResult(response);
        toast.success(`Log level changed for ${request.packageName}`);
      }
    } finally {
      setIsFormLoading(false);
    }
  };

  // Fetch changed packages
  const fetchChangedPackages = async (basePackage: string = "") => {
    setIsPackagesLoading(true);
    try {
      const response = await getChangedPackages(basePackage);
      if (response) {
        setChangedPackages(response.packages);
        const count = response.packages.length;
        toast.success(`Found ${count} changed package${count !== 1 ? 's' : ''}`);
      }
    } finally {
      setIsPackagesLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="container mx-auto pb-12">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="change-logs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LogLevelForm onSubmit={handleChangeLogLevel} isLoading={isFormLoading} />
              
              <div className="space-y-6">
                {changeResult ? (
                  <LogLevelResult result={changeResult} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>How It Works</CardTitle>
                      <CardDescription>
                        Change log levels across Kubernetes pods dynamically
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Enter the namespace and deployment name</li>
                        <li>Optionally, specify a label selector to target specific pods</li>
                        <li>Enter the package name to change the log level for</li>
                        <li>Select the desired log level</li>
                        <li>Click "Change Log Levels" to apply changes</li>
                      </ul>
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 text-sm">
                      <div>
                        <h3 className="font-medium">Change root logger:</h3>
                        <p className="text-muted-foreground">
                          Set package name to "ROOT" to change the root logger
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium">Target specific package:</h3>
                        <p className="text-muted-foreground">
                          Set package name to "com.frafael.service" to change a specific package
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="view-changes">
            <ChangedPackagesList 
              packages={changedPackages}
              onSearch={fetchChangedPackages}
              isLoading={isPackagesLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
