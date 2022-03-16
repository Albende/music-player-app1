import "./App.css";
import Header from "./Header.js";
import MySongs from "./MySongs.js";
import Search from "./Search.jsx";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <MySongs />
        <Search />
      </div>
    </div>
  );
}

export default App;
