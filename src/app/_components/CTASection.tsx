import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const CTASection = (): React.ReactElement => {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
          Join thousands of freelancers and clients who are already using
          GoFreelance to achieve their goals
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6"
            >
              Get Started Free
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-white hover:text-white text-lg px-8 py-6"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
