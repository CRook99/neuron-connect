import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { GraphProvider } from "./contexts/GraphContext";
import { NUM_COLS, NUM_ROWS } from "./utils/constants";
import { DragProvider } from "./contexts/DragContext";
import { SimulationProvider } from "./contexts/FrequencyContext";

const App = () => {
  return (
    <>
      <GraphProvider rows={NUM_ROWS} cols={NUM_COLS}>
        <SimulationProvider>
          <DragProvider>
            <Router>
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="about" element={<About />} />
              </Routes>
            </Router>
          </DragProvider>
        </SimulationProvider>
      </GraphProvider>
    </>
  );
};

export default App;
