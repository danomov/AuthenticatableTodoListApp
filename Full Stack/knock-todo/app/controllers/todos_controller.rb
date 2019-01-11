class TodosController < ApplicationController
  before_action :authenticate_user
  before_action :set_todo, only: [:show, :update, :destroy]

  # GET /todos
  def index
    @todos = Todo.all

    @filteredTodos = []

    token = request.headers["Authorization"]

    decoded = JWT.decode token, nil, false

    info = decoded[0]['sub']

    @todos.each do |key|
      @filteredTodos.push([key['title'], key['id']]) if key['user_id'] == info
    end

    render json: @filteredTodos
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created, location: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    if @todo.update(todo_params)
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    @todo.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def todo_params

    token = request.headers["Authorization"]

    decoded = JWT.decode token, nil, false

    info = decoded[0]['sub']

    params.require(:todo).permit(:title, :finished, :user_id).merge(user_id: info)
  
    end
end
