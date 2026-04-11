import { FiFileText } from 'react-icons/fi';
import { MarkdownContent } from '@/components/MarkdownContent';

interface JobDescriptionProps {
  content: string;
}

export function JobDescription({ content }: JobDescriptionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FiFileText className="w-5 h-5 text-primary" />
        Job Description
      </h2>
      <MarkdownContent content={content} />
    </div>
  );
}
