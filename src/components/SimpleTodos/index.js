import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
]

class SimpleTodos extends Component {
  state = {todosList: initialTodosList, newTask: ''}

  deleteTodo = id => {
    const {todosList} = this.state
    const filteredTodos = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: filteredTodos})
  }

  onChange = event => {
    this.setState({newTask: event.target.value})
  }

  onAddTask = e => {
    e.preventDefault()
    const {newTask, todosList} = this.state

    // Split input into parts (title and count)
    const parts = newTask.trim().split(' ')
    const lastPart = parts[parts.length - 1]

    // Extract count (last part if it's a number)
    const count = Number(lastPart)
    const hasNumber = !Number.isNaN(count)

    const title = hasNumber ? parts.slice(0, -1).join(' ') : newTask
    const numberOfTodos = hasNumber ? count : 1

    if (title) {
      const newTodos = Array.from({length: numberOfTodos}, (_, i) => ({
        id: todosList.length + i + 1,
        title,
      }))

      this.setState({todosList: [...todosList, ...newTodos], newTask: ''})
    }
  }

  render() {
    const {todosList, newTask} = this.state
    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="heading">Simple Todos</h1>
          <form className="input-container" onSubmit={this.onAddTask}>
            <input
              type="text"
              placeholder="Enter task and count (e.g., Buy Milk 3)"
              className="add-task"
              value={newTask}
              onChange={this.onChange}
            />
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
          <ul className="list-container">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todos={todo}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
