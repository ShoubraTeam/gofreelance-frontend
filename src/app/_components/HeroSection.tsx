import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { HiArrowRight, HiCheck } from 'react-icons/hi';

export const HeroSection = (): React.ReactElement => {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-linear-to-br from-primary/5 via-primary/10 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find the perfect{' '}
              <span className="text-primary">freelance talent</span> or your
              next{' '}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                dream project
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              GoFreelance uses AI to connect talented freelancers with clients
              worldwide. Get matched with opportunities that fit your skills, or
              find the perfect talent for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-6"
                >
                  Get Started Free
                  <HiArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-lg px-8 py-6"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              No credit card required • Free to join • Cancel anytime
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2x ">
              <div className="relative aspect-square flex items-center justify-center overflow-hidden">
                <div className="absolute z-10 bg-primary/20 w-full h-full" />
                <Image
                  fill
                  className="object-cover"
                  objectPosition="top"
                  src="/hero-section-img.jpg"
                  alt="hero-section-image"
                />
              </div>
            </div>
            <Card className="z-20 absolute -bottom-4 -right-4 max-w-xs border-none shadow-xl">
              <CardContent className="flex items-center space-x-3 p-4">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <HiCheck className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    AI Match Found!
                  </p>
                  <p className="text-xs text-gray-500">98% compatibility</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
