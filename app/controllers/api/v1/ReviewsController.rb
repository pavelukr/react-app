module Api
  module V1
    class ReviewsController < ApplicationController
      protect_from_forgery with: :null_session

      def create
        review = movie.reviews.new(reviews_params)
        if review.save
          render json:MovieSerializer.new(review.movie, options).serialized_json
        else
          render json: { error: review.errors.messages }, status: 422
        end
      end

      def destroy
        review = Review.find(params[:id])
        if review.destroy
          head :no_content
        else
          render json: { error: review.errors.messages }, status: 422
        end
      end

      private

      def movie
        @movie ||= Movie.find(params[:movie_id])
      end

      def reviews_params
        params.require(:review).permit(:title, :description, :score, :movie_id)
      end

      def options
        @options ||= { include: %i[reviews] }
      end
    end
  end
end
