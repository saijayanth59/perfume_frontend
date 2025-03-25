import { useState, useEffect } from "react";
import { ReviewForm, ReviewData } from "./ReviewForm";

import { ReviewsList } from "./ReviewsList";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Star, LogIn } from "lucide-react";
import { useAuth, SignInButton } from "@clerk/clerk-react";
import { Product } from "@/data/products";
import { addRating } from "@/api/product";

interface ProductReviewsProps {
  productId: number;
  product: Product;
}

export function ProductReviews({ productId, product }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<ReviewData[]>(product.ratings);
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  const handleReviewSubmit = async (review) => {
    await addRating(
      product._id,
      review.username,
      review.gmail,
      review.rating,
      review.comment
    );
    setReviews((prev) => [review, ...prev]);
    setIsOpen(true);
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

      <div className="flex items-center mb-4">
        {/* Average rating display */}
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < product.avgRating
                  ? "text-amber-500 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <span className="ml-2 text-gray-700">
          {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
        </span>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-8">
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
          >
            <span>{isOpen ? "Hide Reviews" : "Show Reviews"}</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-8">
          <ReviewsList reviews={reviews} />
        </CollapsibleContent>
      </Collapsible>

      <div className="mt-12">
        {isSignedIn ? (
          <ReviewForm
            productId={productId}
            onReviewSubmit={handleReviewSubmit}
          />
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">
              Sign in to leave a review
            </h3>
            <p className="text-gray-600 mb-4">
              Please sign in to share your experience with this product
            </p>
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
