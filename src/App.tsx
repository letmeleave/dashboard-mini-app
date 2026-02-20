import { Route, Routes } from "react-router";
import Layout from "@/components/Layout/Layout";
import Dashboard from "@/pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/:pid" element={<></>} />
      </Route>
    </Routes>
  );
}

export default App;
