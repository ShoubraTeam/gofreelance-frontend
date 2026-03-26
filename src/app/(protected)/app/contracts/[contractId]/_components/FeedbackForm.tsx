'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { submitFeedback } from '@/lib/api/feedbacks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FiStar, FiCheckCircle } from 'react-icons/fi';

interface FeedbackFormProps {
  contractId: string;
  isRated: boolean;
}

type FormState = 'idle' | 'submitted' | 'already_rated';

export function FeedbackForm({ contractId, isRated }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [content, setContent] = useState('');
  const [formState, setFormState] = useState<FormState>(isRated ? 'already_rated' : 'idle');

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      submitFeedback({ contractId, rating, content: content.trim() || undefined }),
    onSuccess: () => {
      setFormState('submitted');
    },
    onError: (err: Error) => {
      if (err.message === 'CONTRACT_IS_ALREADY_RATED') {
        setFormState('already_rated');
      } else {
        toast.error(err.message || 'Failed to submit feedback.');
      }
    },
  });

  if (formState === 'submitted' || formState === 'already_rated') {
    return (
      <Card>
        <CardContent className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
          <FiCheckCircle className="w-5 h-5 text-secondary shrink-0" />
          {formState === 'submitted'
            ? 'Your feedback has been submitted. Thank you!'
            : 'You have already submitted feedback for this contract.'}
        </CardContent>
      </Card>
    );
  }

  const activeRating = hovered || rating;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Leave Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Rating</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <FiStar
                  className={`w-7 h-7 transition-colors ${
                    star <= activeRating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Review (optional)</p>
          <Textarea
            placeholder="Share your experience…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>

        <Button
          onClick={() => mutate()}
          disabled={rating === 0 || isPending}
          className="w-full sm:w-auto"
        >
          {isPending ? 'Submitting…' : 'Submit Feedback'}
        </Button>
      </CardContent>
    </Card>
  );
}
