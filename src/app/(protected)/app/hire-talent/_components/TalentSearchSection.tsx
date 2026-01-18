'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FiUsers,
  FiDollarSign,
  FiMessageSquare,
  FiBriefcase,
  FiCheckCircle,
} from 'react-icons/fi';

interface TalentSearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export function TalentSearchSection({ searchValue, onSearchChange }: TalentSearchSectionProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <FiUsers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search freelancers by name, skills, or expertise..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="JUNIOR">Junior</SelectItem>
                  <SelectItem value="MID_LEVEL">Mid Level</SelectItem>
                  <SelectItem value="SENIOR">Senior</SelectItem>
                  <SelectItem value="EXPERT">Expert</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <FiDollarSign className="w-4 h-4 mr-2" />
                Hourly Rate
              </Button>

              <Button variant="outline">
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FiUsers className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Search for Talent</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Use the search bar above to find freelancers based on their skills, experience, and expertise. This feature will be available soon.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <FiMessageSquare className="w-3 h-3 mr-1" />
              Messages
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <FiBriefcase className="w-3 h-3 mr-1" />
              Job Updates
            </Badge>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <FiCheckCircle className="w-3 h-3 mr-1" />
              Proposals
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
