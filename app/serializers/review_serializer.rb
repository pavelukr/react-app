class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :movie_id
end
