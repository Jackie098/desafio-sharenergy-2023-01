import { Route, Routes } from "react-router-dom";
import { Content } from "../layout/Content";
import { Header } from "../layout/Header";
import { Home } from "../pages/Home";

export function RootRoutes() {
  return (
    <Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Content>
    </Header>
  );
}
