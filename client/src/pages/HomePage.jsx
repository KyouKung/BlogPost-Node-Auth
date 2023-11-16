import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [shops, setShops] = useState([]);

  const getShops = async () => {
    try {
      const results = await axios.get("http://localhost:4000/shop");
      setShops(results.data.shops);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const deleteShop = async (shopId) => {
    try {
      await axios.delete(`http://localhost:4000/shop/${shopId}`);
      getShops();
    } catch (error) {
      console.error("Error deleting shop:", error);
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-around items-center w-full mt-[50px]">
        <button
          className="border border-cyan-700 w-[150px] h-[50px] text-white bg-blue-600 rounded-lg"
          onClick={() => {
            navigate("/shop/create");
          }}
        >
          Create Shop
        </button>
        <button
          className="border border-cyan-700 w-[150px] h-[50px] text-white bg-blue-600 rounded-lg"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col justify-center items-center space-y-6 pt-[50px]">
        {(!shops || shops.length === 0) && (
          <div className="text-[50px]">
            <h1>No Shops</h1>
          </div>
        )}
        {shops.map((shop) => (
          <div
            key={shop.shop_id}
            className="w-[1500px] h-[200px] border rounded-lg border-blue-600 flex flex-col justify-center items-start pl-5 relative"
          >
            <h1 className="text-[50px]">{shop.title}</h1>
            <div className="space-x-2">
              <button
                className="border w-[150px] h-[50px] text-white bg-blue-600 rounded-lg"
                onClick={() => navigate(`/shop/view/${shop.shop_id}`)}
              >
                View Shop
              </button>
              <button
                className="border w-[150px] h-[50px] text-white bg-blue-600 rounded-lg"
                onClick={() => navigate(`/shop/edit/${shop.shop_id}`)}
              >
                Edit Shop
              </button>
            </div>
            <button
              className="w-[25px] h-[25px] text-white bg-red-500 rounded-full absolute -top-2 -right-2"
              onClick={() => deleteShop(shop.shop_id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
