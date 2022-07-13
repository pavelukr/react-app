class AddAverageScoreToMovie < ActiveRecord::Migration[6.1]
  def change
    add_column :movies, :average_score, :float, default: 0
  end
end
