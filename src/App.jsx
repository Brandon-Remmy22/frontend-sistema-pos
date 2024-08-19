import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import { AnimatePresence } from "framer-motion";
import { AlertProvider } from "./contexts/AlertContext";
import PublicRoute from "./components/common/routing/PublicRoute";
import PrivateRoute from "./components/common/routing/PrivateRoute";
import LayoutAdmin from "./layouts/LayoutAdmin";



import Login from "./pages/auth/Login";
import ChangePassword from './pages/auth/ChangePassword';
import Home from "./pages/admin/Home";
import ClientIndex from './pages/admin/client/Index';
import UserIndex from './pages/admin/user/Index';
import ArticleIndex from './pages/admin/article/Index';
import CategoryIndex from './pages/admin/category/Index';

function App() {
  const location = useLocation();
  const [count, setCount] = useState(0)

  return (

    <AuthProvider>
      <AlertProvider>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/cambiar-contrasenia" element={<ChangePassword />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<LayoutAdmin />}>
                <Route index element={<Home />} />
                <Route path="/clientes" element={<ClientIndex />} />
                <Route path="/usuarios" element={<UserIndex />} />
                <Route path="/productos" element={<ArticleIndex />} />
                <Route path="/categorias" element={<CategoryIndex />} />
              </Route>
            </Route>
          </Routes>
        </AnimatePresence>
      </AlertProvider>



    </AuthProvider>


  )
}

export default App
