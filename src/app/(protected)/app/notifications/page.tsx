'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FiBell,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiMessageSquare,
  FiBriefcase,
} from 'react-icons/fi';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Notifications
            </h1>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
          <p className="text-muted-foreground">
            Stay updated with your latest activities
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiBell className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              No Notifications Yet
            </h3>
            <p className="text-muted-foreground mb-6">
              When you receive notifications about your jobs, messages, or proposals,
              they&apos;ll appear here.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
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
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Notification Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <FiCheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Success</h3>
                    <p className="text-xs text-muted-foreground">
                      Completed actions and approvals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <FiInfo className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Information</h3>
                    <p className="text-xs text-muted-foreground">
                      Updates and general information
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                    <FiAlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Alerts</h3>
                    <p className="text-xs text-muted-foreground">
                      Important reminders and warnings
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <FiMessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">Messages</h3>
                    <p className="text-xs text-muted-foreground">
                      New messages from clients or freelancers
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
