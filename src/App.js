import React from 'react';
import IconColourPicker from './IconColourPicker';
import IconInput from './IconInput';
import MultipleDataPicker from './MultipleDataPicker';

function App() {
  return (
    <div className="App">
      <div id="app">
        <IconColourPicker />
        <br/>
        <MultipleDataPicker />
        <IconInput 
          hasLabel='true'
          htmlFor='textInput'
          label='Text input'
          required='true'
          type='text'
        />
      </div>
    </div>
  );
}

export default App;
