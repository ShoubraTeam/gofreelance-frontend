import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FiEdit2 } from 'react-icons/fi';
import type { CertificateDetail } from '@/lib/types/profile';

interface CertificateCardProps {
  certificate: CertificateDetail;
  onView: (certificate: CertificateDetail) => void;
  onEdit: (certificate: CertificateDetail) => void;
}

export function CertificateCard({ certificate, onView, onEdit }: CertificateCardProps): React.ReactElement {
  return (
    <div
      className="border border-border rounded-md overflow-hidden group hover:border-primary transition-colors cursor-pointer"
      onClick={() => onView(certificate)}
    >
      {certificate.imageUrl && (
        <div className="relative w-full bg-muted h-64">
          <Image
            src={certificate.imageUrl}
            alt={certificate.name}
            fill
            className="object-contain"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-foreground flex-1">{certificate.name}</h3>
          <div onClick={(e) => e.stopPropagation()}>
            <Button
              onClick={() => onEdit(certificate)}
              variant="ghost"
              size="sm"
              className="hover:bg-accent"
            >
              <FiEdit2 className="w-4 h-4 text-foreground" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
