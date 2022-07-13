class MovieSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :title, :poster_url, :average_score

  has_many :reviews
end
