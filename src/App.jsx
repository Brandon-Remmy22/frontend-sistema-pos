import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PublicRoute from "./components/common/routing/PublicRoute"
import Login from "./pages/auth/Login";


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          {/* <Route element={<PrivateRoute />}>
            <Route path="/" element={<LayoutAdmin />}>
              <Route index element={<Home />} />
              <Route path="/tools/categories" element={<CategoryIndex />} />
              <Route path="/tools/meters" element={<MeterIndex />} />
              <Route path="/tools/brands" element={<BrandIndex />} />
              <Route path="/tools/articles" element={<ArticleIndex />} />
              <Route path="/inventory" element={<InventoryIndex />} />
              <Route path="/sale" element={<SaleIndex />} />
              <Route path="/new-sale" element={<AddSale />} />
              <Route path="/purchase" element={<PurchaseIndex />} />
              <Route path="/new-purchase" element={<AddPurchase />} />
              <Route path="/inventory/kardex/:id" element={<ArticleData />} />
              <Route path="/cashdesk" element={<CashDeskIndex />} />
              <Route path="/historial-cashdesk" element={<HistorialCashDeskIndex />} />
            </Route>
          </Route> */}
        </Routes>

      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
