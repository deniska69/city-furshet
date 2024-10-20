// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import $ from "jquery";

function App() {
  // const [count, setCount] = useState(0);

  const onPress = () => {
    console.log(window.location.href);

    $.ajax({
      type: "POST",
      url: window.location.href + "send.php",
      data: { message: "Test message!" },
      success: function (data) {
        // setResult(data);
        console.log("success:");
        console.log(data);
      },
      error: function (error) {
        console.log("error:");
        console.error(error);
      },
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <button onClick={onPress}>send</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
