import { useState } from "react";
import "./App.css";
import InfiniteScroll from "./InfiniteScroll";

function App() {
  const [useValue, useValueFunction] = useState();
  const [toggle, setToggle] = useState(false);

  async function MyExpressFunction() {
    const response = await fetch("http://localhost:5000/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    useValueFunction(body.express);
  }
  
  return (
    <div className="App">
      <div style={{ margin: "2% 30%", textAlign: "left" }}>
        <h1>Details of Employees </h1>
        <p>
          An employee information form ensures that you have current details on
          employees, including contact details and emergency contact
          information. Collecting and updating these forms periodically will
          allow you to keep track of your employees and reference details when
          you need them. Learn what to include on an employee information form
          and how to create one for your business.
        </p>
        <button
          id="btn"
          style={{ padding: "0.5% 3%", backgroundColor: "#E0E0E0" }}
          onClick={() => {
            setToggle(!toggle);
            MyExpressFunction();
          }}
        >
          Learn more{" "}
        </button>

        {toggle ? <p className="result">{useValue}</p> : ""}
      </div>
      <InfiniteScroll />
    </div>
  );
}

export default App;
