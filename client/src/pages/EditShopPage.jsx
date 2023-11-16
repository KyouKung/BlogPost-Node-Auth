import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditShopPage() {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const getShop = async () => {
    try {
      const results = await axios.get(
        `http://localhost:4000/shop/${params.shop_id}`
      );
      setTitle(results.data.shop.title);
      setContent(results.data.shop.content);
      setLat(results.data.shop.lat);
      setLng(results.data.shop.lng);
    } catch (error) {
      console.error("Error fetching shop:", error);
    }
  };

  useEffect(() => {
    getShop();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:4000/shop/${params.shop_id}`, {
        title,
        content,
        lat,
        lng,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full h-screen relative">
        <form
          className="w-[1500px] h-[400px] border rounded-lg border-blue-600 flex flex-col justify-evenly items-center pl-[10px]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-[50px]">Create Shop Form</h1>
          <div className="flex flex-col w-[1000px]">
            Title
            <input
              className="border rounded-md p-2 w-[100%] border-grey-300"
              id="title"
              name="title"
              type="text"
              placeholder="Enter title here"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              value={title}
              required
            />
          </div>
          <div className="flex flex-col w-[1000px]">
            Content
            <input
              className="border rounded-md p-2 w-[100%] border-grey-300"
              id="content"
              name="content"
              type="text"
              placeholder="Enter content here"
              onChange={(event) => {
                setContent(event.target.value);
              }}
              value={content}
              required
            />
          </div>
          <div className="flex flex-col w-[1000px]">
            Latitude
            <input
              className="border rounded-md p-2 w-[100%] border-grey-300"
              id="lat"
              name="lat"
              type="text"
              placeholder="Enter latitude here"
              onChange={(event) => {
                setLat(event.target.value);
              }}
              value={lat}
              required
            />
          </div>
          <div className="flex flex-col w-[1000px]">
            Longitude
            <input
              className="border rounded-md p-2 w-[100%] border-grey-300"
              id="lng"
              name="lng"
              type="text"
              placeholder="Enter longitude here"
              onChange={(event) => {
                setLng(event.target.value);
              }}
              value={lng}
              required
            />
          </div>
          <div>
            <button
              className="border w-[150px] h-[50px] text-white bg-blue-600 rounded-lg"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
        <button
          className="absolute bottom-60 left-[210px]"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default EditShopPage;
