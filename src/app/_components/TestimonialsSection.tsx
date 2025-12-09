import { HiStar } from 'react-icons/hi';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const TestimonialsSection = (): React.ReactElement => {
  const testimonials = [
    {
      rating: 5,
      text: 'GoFreelance changed my career. The AI matching helped me find projects that perfectly fit my skills. I have earned more in 3 months than I did in a year on other platforms.',
      author: {
        initials: 'SJ',
        name: 'Sarah Johnson',
        role: 'Full-Stack Developer',
        gradient: 'from-primary to-secondary',
      },
    },
    {
      rating: 5,
      text: 'Finding quality developers was always a challenge. GoFreelance AI recommendations brought us incredible talent. The escrow system gave us peace of mind throughout the project.',
      author: {
        initials: 'MC',
        name: 'Michael Chen',
        role: 'Startup Founder',
        gradient: 'from-secondary to-primary',
      },
    },
    {
      rating: 5,
      text: 'The mentorship program helped me level up my skills. Senior developers guided me through complex projects. Now I am earning 3x more than when I started.',
      author: {
        initials: 'AP',
        name: 'Alex Patel',
        role: 'UX Designer',
        gradient: 'from-purple-400 to-purple-600',
      },
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 bg-linear-to-br from-primary/10 to-secondary/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied freelancers and clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-lg flex flex-col"
            >
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar
                      key={i}
                      className="h-5 w-5 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </CardContent>
              <CardFooter className="flex items-center mt-auto">
                <Avatar className={`h-12 w-12 bg-linear-to-br ${testimonial.author.gradient}`}>
                  <AvatarFallback className="text-white font-semibold bg-transparent">
                    {testimonial.author.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">
                    {testimonial.author.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.author.role}
                  </p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
