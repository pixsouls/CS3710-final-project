class Api::V1::BoardsController < ApplicationController
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

  # GET /boards/:id/media
  def media
    render json: Media.where(board_id: params[:id])
  end

  # POST /boards
  def create
    @board = Board.new(board_params)

    if @board.save
      render json: @board, status: :created, location: @board
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
