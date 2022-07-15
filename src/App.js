import React, { useState } from "react";
import { useEffect } from "react";

import "./App.css";

function App() {
  // State Variables
  const [count, setCount] = useState([]);
  const [result, setResult] = useState(0);

  useEffect(() => {
    function resultHandler() {
      let result = 0;
      count.forEach((item) => {
        if (!item.disabled) {
          if (item.operator === "+") {
            result += Number(item.value);
          } else if (item.operator === "-") {
            result -= Number(item.value);
          }
        }
      });
      setResult(result);
    }
    resultHandler();
  }, [count]);

  const addRowHandler = () => {
    setCount([
      ...count,
      { id: count.length, value: 0, disabled: false, operator: "+" },
    ]);
  };

  const removeHandler = (index) => {
    const newCount = [...count];
    newCount.splice(index, 1);
    setCount(newCount);
  };

  const disableHandler = (index) => {
    setCount((prevState) => {
      const newState = [...prevState];
      newState[index].disabled = true;
      return newState;
    });
  };

  const onSelectChange = (data, index) => {
    setCount((prevState) => {
      const newState = [...prevState];
      newState[index].operator = data.target.value;
      return newState;
    });
  };

  const onChangeInputHandler = (data, index) => {
    setCount((prevState) => {
      const newState = [...prevState];
      newState[index].value = data;
      return newState;
    });
  };

  const rowRender = () => {
    return (
      <div className="listContainer">
        <ul>
          {count.map((item, index) => {
            return (
              <li key={item.id}>
                <select
                  defaultValue={"+"}
                  onChange={(val) => onSelectChange(val, index)}
                >
                  <option value="+">+</option>
                  <option value="-">-</option>
                </select>
                <input
                  type="text"
                  defaultValue="0"
                  onChange={(e) => onChangeInputHandler(e.target.value, index)}
                />
                <button onClick={() => removeHandler(index)}>Delete</button>
                <button
                  disabled={item.disabled}
                  onClick={() => disableHandler(index)}
                >
                  Disable
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="headerText">React Calculator</div>
        <div className="mainButtonContainer">
          <button onClick={addRowHandler}>Add Row</button>
          <div>Result : {result}</div>
        </div>
        {rowRender()}
      </div>
    </div>
  );
}

export default App;
