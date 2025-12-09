"use client";

import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Rating } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Product, Review } from "@/types";
import { formatDate, getInitials } from "@/lib/utils";

interface ProductReviewsProps {
  product: Product;
  reviews: Review[];
}

export function ProductReviews({ product, reviews }: ProductReviewsProps) {
  const ratingCounts = [5, 4, 3, 2, 1].map((r) => ({ rating: r, count: reviews.filter((rev) => rev.rating === r).length }));

  return (
    <div className="space-y-8">
      {/* Summary */}
      <div className="flex flex-col md:flex-row gap-8 p-6 bg-muted/50 rounded-xl">
        <div className="text-center">
          <div className="text-5xl font-bold text-primary">{product.rating.toFixed(1)}</div>
          <Rating value={product.rating} size="lg" className="justify-center my-2" />
          <p className="text-sm text-muted-foreground">{product.ratingCount} ulasan</p>
        </div>
        <div className="flex-1 space-y-2">
          {ratingCounts.map(({ rating, count }) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm w-12">{rating} <Star className="h-3 w-3 inline fill-yellow-400 text-yellow-400" /></span>
              <Progress value={(count / reviews.length) * 100} className="h-2 flex-1" />
              <span className="text-sm text-muted-foreground w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex gap-4 p-4 border rounded-xl">
            <Avatar>
              <AvatarImage src={review.user?.avatar || undefined} />
              <AvatarFallback>{getInitials(review.user?.name || "User")}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{review.user?.name}</span>
                {review.isVerified && <Badge variant="verified">Pembeli Terverifikasi</Badge>}
              </div>
              <Rating value={review.rating} size="sm" className="mb-2" />
              <p className="text-sm mb-2">{review.comment}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{formatDate(review.createdAt)}</span>
                <Button variant="ghost" size="sm"><ThumbsUp className="h-4 w-4 mr-1" />Membantu</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}