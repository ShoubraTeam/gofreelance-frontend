import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { CertificateDetail } from '@/lib/types/profile';

interface CertificateViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate: CertificateDetail | undefined;
}

export function CertificateViewDialog({ open, onOpenChange, certificate }: CertificateViewDialogProps): React.ReactElement {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{certificate?.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {certificate?.imageUrl && (
            <div className="relative w-full bg-muted rounded-lg overflow-hidden h-96">
              <Image
                src={certificate.imageUrl}
                alt={certificate.name}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
