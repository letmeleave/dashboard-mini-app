import { Route, Routes } from "react-router";
import Dashboard from "@/pages/Dashboard/Dashboard";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { BrowserRouter } from "react-router";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />{" "}
        <Route path="/projects/:id" element={<ProjectDetails />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
