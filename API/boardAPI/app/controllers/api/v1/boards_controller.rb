class Api::V1::BoardsController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :set_board, only: %i[ show update destroy ]

  # GET /boards
  def index
    @boards = Board.all

    render json: @boards
  end

  # GET /boards/1
  def show
    render json: @board
  end

  # GET /boards/search
  def search
    search_term = params[:string]
    user_id = params[:user_id]
    # https://stackoverflow.com/questions/22596861/how-can-i-match-a-partial-string-to-a-databases-objects-attribute-regexp
    if search_term
      @boards = Board.where("title like ?", '%' + search_term + '%')
    elsif user_id
      @boards = Board.where(user_id: user_id)
    else
      @boards = Board.all
    end

    render json: @boards
  end

  # GET /boards/:id/media
  def media
    render json: Media.where(board_id: params[:id])
  end

  # POST /boards
  def create
    @board = Board.new(board_params)

    if @board.save
      render json: @board, status: :created
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /boards/1
  def update
    if @board.update(board_params)
      render json: @board
    else
      render json: @board.errors, status: :unprocessable_entity
    end
  end

  # DELETE /boards/1
  def destroy
    @board.destroy!
  end

  private
    def set_board
      @board = Board.find_by(id: params[:id])
    end

    def board_params
      params.require(:board).permit(:title, :desc, :user_id)
    end
end
