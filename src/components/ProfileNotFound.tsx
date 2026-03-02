import { Card, CardContent } from '@/components/ui/card';

export function ProfileNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="max-w-md">
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Profile Not Found</h2>
          <p className="text-muted-foreground">
            The profile you&apos;re looking for doesn&apos;t exist.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
