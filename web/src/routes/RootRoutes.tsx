import { Route, Routes } from "react-router-dom";

import { Content } from "../layout/Content";
import { Header } from "../layout/Header";

import { CatsCode } from "../pages/CatsCode";
import { Customers } from "../pages/Customers";
import { Home } from "../pages/Home";
import { RandomDogs } from "../pages/RandomDogs";

export function RootRoutes() {
  return (
    <Header>
      <Content>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cats" element={<CatsCode />}></Route>
          <Route path="/dogs" element={<RandomDogs />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
        </Routes>
      </Content>
    </Header>
  );
}
