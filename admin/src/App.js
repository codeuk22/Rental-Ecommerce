import React from "react";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import "./app.css";
import Home from "./pages/home/Home";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Transactions from "./pages/transactions/Transactions";

function App() {
  // // console.log(localStorage.getItem("persist:root"))

  // // const admin=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  const admin = localStorage.getItem("user");
  // const admin = false;
  return (
    <>
      {admin ? (
        <BrowserRouter>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/home/users" element={<UserList />} />
              <Route path="/home/user/:userId" element={<User />} />
              <Route path="/home/newUser" element={<NewUser />} />
              <Route path="/home/products" element={<ProductList />} />
              <Route path="/home/product/:productsId" element={<Product />} />
              <Route path="/home/newproduct" element={<NewProduct />} />
              <Route path="/home/transactions" element={<Transactions />} />
            </Routes>
          </div>
        </BrowserRouter>) : (

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}





export default App;

