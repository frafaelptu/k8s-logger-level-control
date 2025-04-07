
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { ChangedPackage } from "@/types/api";

interface ChangedPackagesListProps {
  packages: ChangedPackage[];
  onSearch: (packageName: string) => void;
  isLoading: boolean;
}

const ChangedPackagesList: React.FC<ChangedPackagesListProps> = ({ packages, onSearch, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changed Packages</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Filter by package name (e.g. com.frafael)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Search
          </Button>
        </form>

        {packages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            {isLoading ? "Loading..." : "No changed packages found"}
          </div>
        ) : (
          <div className="rounded border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package Name</TableHead>
                  <TableHead>Current Level</TableHead>
                  <TableHead>Default Level</TableHead>
                  <TableHead>Changed At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{pkg.packageName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{pkg.currentLevel}</Badge>
                    </TableCell>
                    <TableCell>{pkg.defaultLevel}</TableCell>
                    <TableCell>{new Date(pkg.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChangedPackagesList;
