import { v4 as uuidv4 } from 'uuid';
import { CONSTANTS } from '../actions';

let listID = 2
let cardID = 4


const initState = [
  {
    title: 'Animals',
    id: 0,
    cards: [
      {
        id: 0,
        text: 'I love dogs'
      },
      {
        id: 1,
        text: 'I love dogs'
      },

    ]
  },
  {
    title: 'Groceries',
    id: 1,
    cards: [
      {
        id: 0,
        text: 'Eggs'
      },
      {
        id: 1,
        text: 'Milk'
      },

    ]
  },
]

const listsReducer = (state = initState, action) => {
  switch (action.type) {

    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: listID,
      }
      listID += 1
      return [...state, newList]

      case CONSTANTS.ADD_CARD:
        const newCard = {
          text: action.payload.text,
          id: cardID
        }
        cardID += 1

        const newState = state.map(list => {
          if(list.id === action.payload.listID) {
            return {
              ...list,
              cards: [...list.cards, newCard]
            }
          } else {
            return list
          }
        });

        return newState;

    default: 
      return state
  }
}

export default listsReducer;