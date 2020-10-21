import { v4 as uuidv4 } from 'uuid';
import { CONSTANTS } from '../actions';

let listID = 4
let cardID = 6


const initState = [
  {
    title: 'Grocery List',
    id: `list-${0}`,
    cards: [
      {
        id: `card-${0}`,
        text: 'Tofu'
      },
      {
        id: `card-${1}`,
        text: 'Garam Masala'
      },
      {
        id: `card-${2}`,
        text: 'Tomatoes',
      },
      {
        id: `card-${3}`,
        text: 'Rapini',
      },
    ]
  },
  {
    title: 'Food Inventory',
    id: `list-${1}`,
    cards: [
      {
        id: `card-${4}`,
        text: 'Eggs'
      },
      {
        id: `card-${5}`,
        text: 'Milk'
      },
    ]
  },
  {
    title: 'Groceries Purchased',
    id: `list-${3}`,
    cards: []
  },
]

const listsReducer = (state = initState, action) => {
  switch (action.type) {

    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`,
      }
      listID += 1
      return [...state, newList]

      case CONSTANTS.ADD_CARD:
        const newCard = {
          text: action.payload.text,
          id: `card-${cardID}`,
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
        
        // same list logic
        case CONSTANTS.DRAG_HAPPENED:
          
          // destructure objects needed
          const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd } = action.payload;

          // clone state to modify
          const dragState = [...state];
          // in same list
          if (droppableIdStart === droppableIdEnd) {
            const list = state.find(list => droppableIdStart === list.id);
            const card = list.cards.splice(droppableIndexStart, 1);
            list.cards.splice(droppableIndexEnd, 0, ...card);
          }
          
          // between lists logic
          if (droppableIdStart !== droppableIdEnd) {
            // find list where drag happened
            const listStart = state.find(list => droppableIdStart === list.id);
            // pull card from this list
            const card = listStart.cards.splice(droppableIndexStart, 1);
            // find list and enter card
            const listEnd = state.find(list => droppableIdEnd === list.id);
            // put card in new list
            listEnd.cards.splice(droppableIndexEnd, 0, ...card);
          }
          
          return dragState;


    default: 
      return state
  }
}

export default listsReducer;