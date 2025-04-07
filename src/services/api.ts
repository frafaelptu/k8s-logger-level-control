
import { toast } from "sonner";
import { 
  LogLevelChangeRequest, 
  LogLevelChangeResponse, 
  ChangedPackagesResponse 
} from "@/types/api";

const API_BASE_URL = "http://localhost:8081"; // Default for local development

export const changeLogLevel = async (
  request: LogLevelChangeRequest
): Promise<LogLevelChangeResponse | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/log-level`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to change log level: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error changing log level:", error);
    toast.error("Failed to change log level");
    return null;
  }
};

export const getChangedPackages = async (
  basePackage?: string
): Promise<ChangedPackagesResponse | null> => {
  try {
    const url = new URL(`${API_BASE_URL}/log-level/changed-packages`);
    if (basePackage) {
      url.searchParams.append("package", basePackage);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get changed packages: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting changed packages:", error);
    toast.error("Failed to fetch changed packages");
    return null;
  }
};

export const getActuatorHealth = async (): Promise<{ status: string } | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/actuator/health`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Health check failed: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error checking health:", error);
    return null;
  }
};
