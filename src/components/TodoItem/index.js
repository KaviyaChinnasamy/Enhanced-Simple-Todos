import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
      updatedTitle: props.todos.title,
      isChecked: false,
    }
  }

  onDelete = () => {
    const {deleteTodo, todos} = this.props
    deleteTodo(todos.id)
  }

  onEditClick = () => {
    this.setState(prevState => ({isEditing: !prevState.isEditing}))
  }

  onChangeText = event => {
    this.setState({updatedTitle: event.target.value})
  }

  onSaveClick = () => {
    this.setState({isEditing: false})
  }

  onCheckboxChange = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {todos} = this.props
    const {isEditing, updatedTitle, isChecked} = this.state

    return (
      <li className="list">
        <div className="input-container-todo">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={this.onCheckboxChange}
          />
          {isEditing ? (
            <input
              type="text"
              value={updatedTitle}
              onChange={this.onChangeText}
              className="edit-input"
              disabled={isChecked}
            />
          ) : (
            <p className={`title ${isChecked ? 'strike' : ''}`}>
              {todos.title}
            </p>
          )}
        </div>
        <div className="button-container">
          {isEditing ? (
            <button
              className="edit-button"
              type="button"
              onClick={this.onSaveClick}
              disabled={isChecked}
            >
              Save
            </button>
          ) : (
            <button
              className="edit-button"
              type="button"
              onClick={this.onEditClick}
              disabled={isChecked}
            >
              Edit
            </button>
          )}
          <button
            className="delete-button"
            type="button"
            onClick={this.onDelete}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
