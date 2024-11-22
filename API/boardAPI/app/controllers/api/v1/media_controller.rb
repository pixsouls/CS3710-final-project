class Api::V1::MediaController < ApplicationController
  before_action :set_media, only: %i[show update destroy]

  # GET /media
  def index
    @media = Media.all
    render json: @media
  end

  # GET /media/1
  def show
    render json: @media
  end

  # POST /media
  def create
    @media = Media.new(media_params)

    if @media.save
      render json: @media, status: :created #,  location: @media
    else
      render json: @media.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /media/1
  def update
    if @media.update(media_params)
      render json: @media
    else
      render json: @media.errors, status: :unprocessable_entity
    end
  end

  # DELETE /media/1
  def destroy
    @media.destroy!
  end

  private

  def set_media
    @media = Media.find(params[:id])
  end

  def media_params
    params.require(:media).permit(:name, :src, :board_id, position: [:x, :y]) # whack lol
  end
end
