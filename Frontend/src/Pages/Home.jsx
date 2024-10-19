import axios from "axios";
import { Link } from "react-router-dom";
import React from "react";
import Spinner from "../../Components/Spinner";
import { MdOutlineAddBox } from "react-icons/md";
import { useEffect, useState } from "react";
import BookCard from "../../Components/Home/BookCard";
import BookTables from "../../Components/Home/BookTables";

const Home = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:9990/books")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
        console.log("the data value is:", datas);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 w-full h-screen overflow-auto">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center gap-x-4 mb-4">
        <p className="font-bold text-3xl">Library Management</p>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-600 text-3xl" />
        </Link>
      </div>
      {loading ? <Spinner /> : showType === 'table' ? (
        <BookTables datas={datas} />
      ) : (
        <div className="border-separate border-spacing-2 border border-slate-500">
          <BookCard datas={datas} />
        </div>
      )}
    </div>
  );
};

export default Home;
