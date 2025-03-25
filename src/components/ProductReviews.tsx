
import { useState, useEffect } from "react";
import { ReviewForm, ReviewData } from "./ReviewForm";
import { ReviewsList } from "./ReviewsList";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Star, LogIn } from "lucide-react";
import { useAuth, SignInButton } from "@clerk/clerk-react";

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();
  
  // Load reviews from localStorage on component mount
  useEffect(() => {
    const savedReviews = localStorage.getItem(`product-reviews-${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);
  
  // Save reviews to localStorage when they change
  useEffect(() => {
    localStorage.setItem(`product-reviews-${productId}`, JSON.stringify(reviews));
  }, [reviews, productId]);
  
  const handleReviewSubmit = (review: ReviewData) => {
    setReviews((prev) => [review, ...prev]);
    setIsOpen(true); // Open the reviews section after submitting
  };
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
      
      <div className="flex items-center mb-4">
        {/* Average rating display */}
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => {
            // Calculate average rating
            const avgRating = reviews.length 
              ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
              : 0;
            
            return (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.round(avgRating) ? "text-amber-500 fill-amber-500" : "text-gray-300"
                }`}
              />
            );
          })}
        </div>
        
        <span className="ml-2 text-gray-700">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </span>
      </div>
      
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-8"
      >
        <CollapsibleTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center"
          >
            <span>{isOpen ? "Hide Reviews" : "Show Reviews"}</span>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-8">
          <ReviewsList reviews={reviews} />
        </CollapsibleContent>
      </Collapsible>
      
      <div className="mt-12">
        {isSignedIn ? (
          <ReviewForm productId={productId} onReviewSubmit={handleReviewSubmit} />
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Sign in to leave a review</h3>
            <p className="text-gray-600 mb-4">Please sign in to share your experience with this product</p>
            <SignInButton mode="modal">
              <Button className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign in to write a review
              </Button>
            </SignInButton>
          </div>
        )}
      </div>
    </div>
  );
}
