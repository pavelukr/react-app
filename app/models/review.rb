class Review < ApplicationRecord
  belongs_to :movie

  after_create :avg_score
  after_destroy :avg_score

  def avg_score
    if movie.reviews.count.positive?
      movie.update(average_score: movie.reviews.average(:score).round(2).to_f)
    else
      movie.update(average_score: 0)
    end
  end
end
