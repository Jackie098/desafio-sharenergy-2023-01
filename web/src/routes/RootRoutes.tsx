import { Route, Routes } from "react-router-dom";

export function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>}></Route>
    </Routes>
  );
}
