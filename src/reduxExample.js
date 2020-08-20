import React, { Component } from 'react';
import { createStore } from 'redux'

class App extends Component {
  render() {

    // A reducer function must hace two parameters
    // State, Action 
    const reducer = (state={}, action)=>{
      return state
    }

    const store = createStore(reducer)
    store.subscribe(()=>{
      console.log(store.getState());
      
    })
    store.dispatch({type: 'some'})
    store.dispatch({type: 'some'})
    store.dispatch({type: 'some'})

    return (
      <div>
        <h4>This is reudx</h4>
      </div> 
    );
  }
}

export default App;

// Store -> will hold all of our application data/state
// Reducer ( healper function for store ) A Function who returns a specific amount of state or date
// Attion -> Event occures
// Dispatch 
// Subscriber
// *** Todos ***
// 1. Create a Reducer
// 2. Create Store with the help of Reducer
// 3. Now we can subscribe
// 4. dispatch (action)