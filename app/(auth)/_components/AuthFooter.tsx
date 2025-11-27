import Link from 'next/link';

interface AuthFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export const AuthFooter = ({
  text,
  linkText,
  linkHref,
}: AuthFooterProps): React.ReactElement => {
  return (
    <div className="mt-6 text-center text-sm">
      <span className="text-gray-600">{text} </span>
      <Link
        href={linkHref}
        className="font-medium text-primary hover:text-primary/80 hover:underline"
      >
        {linkText}
      </Link>
    </div>
  );
};
