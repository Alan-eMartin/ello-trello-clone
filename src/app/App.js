import React  from 'react';
import '../styles/App.scss';
// Components
import Layout from '../components/Layout/index';
import TaskList from '../components/TaskList';
import ButtonForm from '../components/ButtonForm/index'
// Redux
import { connect } from 'react-redux'

const App = (props) => {

  const { list } = props;

  return (
    <div className='App'>
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
    </div>
  );
}

const mapStateToProps = state => ({
  list: state.list,
})

export default connect(mapStateToProps) (App);
