
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating" }).max(5),
  title: z.string().min(3, { message: "Review title must be at least 3 characters." }),
  comment: z.string().min(5, { message: "Review must be at least 5 characters." }),
});

interface ReviewFormProps {
  productId: number;
  onReviewSubmit: (review: ReviewData) => void;
}

export type ReviewData = z.infer<typeof formSchema> & {
  id: string;
  date: string;
  productId: number;
  name: string;
  email: string;
};

export function ReviewForm({ productId, onReviewSubmit }: ReviewFormProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const { user } = useUser();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    
    const newReview: ReviewData = {
      ...values,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      productId,
      name: user.fullName || user.username || 'Anonymous User',
      email: user.primaryEmailAddress?.emailAddress || '',
    };
    
    onReviewSubmit(newReview);
    form.reset();
    toast.success("Your review has been submitted successfully!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Write a Review</h3>
        
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer transition-colors ${
                        star <= (hoveredRating || field.value) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => form.setValue("rating", star)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input placeholder="Summarize your experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience with this product"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full md:w-auto">Submit Review</Button>
      </form>
    </Form>
  );
}
