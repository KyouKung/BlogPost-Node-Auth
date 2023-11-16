import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleMapReact from "google-map-react";

function ViewShopPage() {
  const [shop, setShop] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  const getShop = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/shop/${params.shop_id}`
      );
      setShop(results.data.shop);
    } catch (error) {
      console.error("Error fetching shop:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getShop();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="w-[1500px] h-[400px] border rounded-lg border-blue-600 flex flex-col justify-around items-center pl-[10px] mt-[20px]">
          <h1 className="text-[50px]">View Shop Page</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="text-[15px]">Title</h1>
                <h1 className="text-[30px]">{shop.title}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px]">Content</h1>
                <h1 className="text-[30px]">{shop.content}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px]">Latitude</h1>
                <h1 className="text-[30px]">{shop.lat}</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[15px]"> Longitude</h1>
                <h1 className="text-[30px]">{shop.lng}</h1>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            height: "500px",
            width: "500px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <GoogleMapReact
            bootstrapURLKeys={{ key: "" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={shop.lat}
              lng={shop.lng}
              text={shop.title}
            />
          </GoogleMapReact>
        </div>
      </div>
      <button
        className="absolute bottom-[480px] left-[210px]"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default ViewShopPage;
