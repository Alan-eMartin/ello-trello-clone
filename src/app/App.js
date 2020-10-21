import React  from 'react';
import { DragDropContext, dragDropContext } from 'react-beautiful-dnd';
import { sort } from '../actions'
import '../styles/App.scss';
// Components
import Layout from '../components/Layout/index';
import TaskList from '../components/TaskList';
import ButtonForm from '../components/ButtonForm/index'
// Redux
import { connect } from 'react-redux'

const App = (props) => {

  // Props
  const { list, dispatch } = props;

  // DragNDrop Logic
  const onDragEnd = (res) => {
    const { destination, source, draggableId} = res;
    // Check if there is an available destination for card
    if (!destination) {
       return;
    }

    dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId))

  }

  return (
    <DragDropContext onDragEnd={onDragEnd} className='App'>
      <Layout>
        
        {
          list.map(list => (
            <TaskList
              title={list.title}
              cards={list.cards}
              listID={list.id}
              key={list.id}
            />
          ))
        }
        <ButtonForm list/>
      </Layout>
    </DragDropContext>
  );
}

const mapStateToProps = state => ({
  list: state.list,
})

export default connect(mapStateToProps) (App);
