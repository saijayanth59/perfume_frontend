
import { Star } from "lucide-react";
import { ReviewData } from "./ReviewForm";

interface ReviewsListProps {
  reviews: ReviewData[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-200 pb-6">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-lg">{review.title}</h4>
            <span className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-700">
              by {review.name}
            </span>
          </div>
          
          <p className="mt-3 text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
