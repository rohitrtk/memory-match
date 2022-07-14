import Backdrop from "./components/Backdrop/Backdrop";
import Sidebar from "./components/Sidebar/Sidebar";
import Game from "./components/Game/Game";

import "./App.css";

const App = () => {
  return (
    <Backdrop>
      <div className="layout">
        <Sidebar />
        <Game />
      </div>
    </Backdrop>
  );
};

export default App;
