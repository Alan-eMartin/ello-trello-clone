import React, {useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { addList, addCard } from '../../actions'
import './style.scss';

const ButtonForm = (props) => {

  // State
  const [openForm, setOpenForm] = useState(false)
  const [text, setText] = useState('')

  // Props
  const { list, dispatch, listID } = props;

  // Open
  const open = () => {
    setOpenForm(!openForm)
  }

  // Close
  const close = () => {
    setOpenForm(false)
    setText('')
  }

  // Handle Textfield Change
  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  // Add List
  const handleAddList = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(addList(text))
      setText('')
      setOpenForm(false)
    }
    return
  }

  // Add Card
  const handleAddCard = (e) => {
    e.preventDefault()

    if (text) {
      dispatch(addCard(listID, text))
      setText('')
      setOpenForm(false)
    }
    return
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
          onSubmit={list ? handleAddList : handleAddCard}
        >
          <textarea
            className={list ? 'task-list add-list-input' :'task-card add-card-input'}
            placeholder={placeholder}
            value={text}
            onChange={handleInputChange}
            autoFocus
          />
          <div className="form-button-container">
            <button
              type='submit'
              className={list ? 'add-list-input-button' : 'add-card-input-button'}
              title={title}
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

export default connect() (ButtonForm);