// import uuid from 'uuid';

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
        id: 0,
        text: 'I love dogs'
      },

    ]
  },
  {
    title: 'Groceries',
    id: 1,
    cards: [
      {
        id: 1,
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
    default: 
      return state
  }
}

export default listsReducer;