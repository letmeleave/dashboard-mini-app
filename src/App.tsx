import { Route, Routes } from "react-router";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<></>} />
        <Route path="/:pid" element={<></>} />
      </Route>
    </Routes>
  );
}

export default App;
