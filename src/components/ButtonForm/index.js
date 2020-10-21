import React, {useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import './style.scss';

const ButtonForm = (props) => {
  // State
  const [openForm, setOpenForm] = useState(false)
  const [text, setText] = useState('')

  // Props
  const { list } = props;

  // Open
  const open = () => {
    setOpenForm(!openForm)
  }

  // Close
  const close = () => {
    setOpenForm(false)
  }

  // Handle Textfield Change
  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  // Handle Textfield Submit
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // Conditional Button
  const renderButton = () => {
    const buttonText = list ? 'Add another list' : 'Add another card';

    return (
      <button 
        className={list ? 'add-list-button' : 'add-card-button'}
        onClick={() => open()}
      >
        <span className="add-button-text">
          <AddIcon /> {buttonText}
        </span>
      </button>
    )
  } 

  // Conditional Form
  const renderForm = () => {

    const placeholder = list 
      ? 'Enter a title for this list...' 
      : 'Enter a title for this card...'; 

    const title = list
      ? 'Add List' 
      : 'Add Card';

    return (
      <>
        <form 
          className={list ? 'add-list-form' : 'add-card-form'}
        >
          <textarea
            className={list ? 'task-list add-list-input' :'add-card-input'}
            placeholder={placeholder}
            value={text}
            onBlur={() => close()}
            onChange={handleInputChange}
            autoFocus
          />
          <div className="form-button-container">
            <button
              className={list ? 'add-list-input-button' : 'add-card-input-button'}
              title={title}
              onSubmit={() => handleSubmit()}
            >
              {title}
            </button>
            <button 
              className="close-form-button"
              onClick={() => close()}
            >
              <CloseIcon fontSize={"large"}/>
            </button>
          </div>

        </form>
      </>
    );
  }

  return  openForm ? renderForm() : renderButton()
}

export default ButtonForm;