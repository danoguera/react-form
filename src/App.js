import React from 'react';
import logo from './logo.svg';
import uuid from 'uuid-random';
import './App.css';

class App extends React.Component {
  state = {
    task: '',
    description: '',
    complete: false,
    date: '',
    lists: []
  };

  handleChange = (e) => {
    const taskIsCheckbox = ['complete'];
    
    //destructuring del target (name,value)
    const { name } = e.target;

    //if taskischeckbox exists in the array, if it is checked, assign it to the value variable
    const value = taskIsCheckbox.includes(name) ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    //prevent the submited form show quickly
    e.preventDefault();
    
    const { task, description, date, complete } = this.state;
    const list = { id: uuid(), task, description, date, complete };
    const lists = this.state.lists.concat(list);

    this.setState({
      lists,
      task: '',
      description: '',
      complete: false
    }, () => console.log(this.state))
  }

  render(){
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task">Task</label>
          <input 
            type="text"
            onChange={this.handleChange}
            value={this.state.task}
            name="task"
            id="task"
          />
          <label htmlFor="decription">Description</label>
          <input 
              type="text"
              onChange={this.handleChange}
              value={this.state.description}
              name="description"
              id="description"
          />  
          <label htmlFor="decription">Date</label>
          <input 
            type="date"
            onChange={this.handleChange}
            value={this.state.date}
            name="date"
            id="date"
          />  
          <label htmlFor="decription">Complete</label>
          <input 
            type="checkbox"
            onChange={this.handleChange}
            checked={this.state.complete}
            name="complete"
            id="complete"
          />                    
          <button onClick={e => this.handleSubmit(e)}>Submit</button>    
        </form>
        {this.state.lists.map(el => {
          return(
            <ul className="list" key={el.id}>
              <li>{el.task}</li>
              <li>{el.description}</li>
              <li>{el.complete ? 'Task done' : 'Task to be completed'}</li>
            </ul>
          )
        })}
      </div>
    );
  }
}

export default App;
