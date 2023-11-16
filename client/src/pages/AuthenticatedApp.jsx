import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import CreateShopPage from "./CreateShopPage";
import ViewShopPage from "./ViewShopPage";
import EditShopPage from "./EditShopPage";
import "../App.css";
import NotFoundPage from "./NotFoundPage";

function AuthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop/create" element={<CreateShopPage />} />
        <Route path="/shop/view/:shop_id" element={<ViewShopPage />} />
        <Route path="/shop/edit/:shop_id" element={<EditShopPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AuthenticatedApp;
