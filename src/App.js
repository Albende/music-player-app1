import "./App.css";
import MySongs from "./MySongs.js";
import Search from "./Search.jsx";
function App() {
  return (
    <div className="App">
      <div className="body">
        <MySongs />
        <Search />
      </div>
    </div>
  );
}

export default App;
