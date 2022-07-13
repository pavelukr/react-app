module Api
  module V1
    class MoviesController < ApplicationController
      protect_from_forgery with: :null_session

      def new
        render json: { status: 204 }
      end

      def index
        movies = Movie.all

        render json: MovieSerializer.new(movies, options).serialized_json
      end

      def show
        movie = Movie.find(params[:id])

        render json: MovieSerializer.new(movie, options).serialized_json
      end

      def create
        movie = Movie.new(movie_params)

        if movie.save
          render json: MovieSerializer.new(Movie.all, options).serialized_json
        else
          render json: { error: movie.errors.messages }, status: 422
        end
      end

      def update
        movie = Movie.find(params[:id])

        if movie.update(movie_params)
          render json: MovieSerializer.new(movie, options).serialized_json
        else
          render json: { error: movie.errors.messages }, status: 422
        end
      end

      def destroy
        movie = Movie.find(params[:id])

        if movie.destroy
          head :no_content
        else
          render json: { error: movie.errors.messages }, status: 422
        end
      end

      private

      def movie_params
        params.require(:movie).permit(:title, :poster_url)
      end

      def options
        @options ||= { include: %i[reviews] }
      end
    end
  end
end
