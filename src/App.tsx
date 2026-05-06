import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav
          style={{
            padding: "20px",
            backgroundColor: "#2760fa",
            marginBottom: "20px",
          }}
        >
          <Link
            to="/"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Asiakkaat
          </Link>
          <Link
            to="/trainings"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Harjoitukset
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
