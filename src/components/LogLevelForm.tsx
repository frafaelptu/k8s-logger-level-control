
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogLevelChangeRequest, LogLevel } from "@/types/api";
import { toast } from "sonner";

interface LogLevelFormProps {
  onSubmit: (request: LogLevelChangeRequest) => void;
  isLoading: boolean;
}

const LogLevelForm: React.FC<LogLevelFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<LogLevelChangeRequest>({
    namespace: "",
    deployment: "",
    labelSelector: "",
    packageName: "",
    logLevel: "INFO",
  });

  const logLevels: LogLevel[] = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR"];

  const handleChange = (field: keyof LogLevelChangeRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.namespace.trim()) {
      toast.error("Namespace is required");
      return;
    }
    
    if (!formData.deployment.trim()) {
      toast.error("Deployment is required");
      return;
    }
    
    if (!formData.packageName.trim()) {
      toast.error("Package name is required");
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Change Log Level</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="namespace">Namespace *</Label>
              <Input
                id="namespace"
                placeholder="e.g. default"
                value={formData.namespace}
                onChange={(e) => handleChange("namespace", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deployment">Deployment *</Label>
              <Input
                id="deployment"
                placeholder="e.g. my-app"
                value={formData.deployment}
                onChange={(e) => handleChange("deployment", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="labelSelector">Label Selector (Optional)</Label>
            <Input
              id="labelSelector"
              placeholder="e.g. app=my-service,tier=backend"
              value={formData.labelSelector || ""}
              onChange={(e) => handleChange("labelSelector", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Kubernetes label selector format: key1=value1,key2=value2
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="packageName">Package Name *</Label>
            <Input
              id="packageName"
              placeholder="e.g. com.frafael.service"
              value={formData.packageName}
              onChange={(e) => handleChange("packageName", e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Use 'ROOT' for the root logger
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logLevel">Log Level *</Label>
            <Select
              value={formData.logLevel}
              onValueChange={(value) => handleChange("logLevel", value as LogLevel)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select log level" />
              </SelectTrigger>
              <SelectContent>
                {logLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Changing log levels..." : "Change Log Levels"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LogLevelForm;
