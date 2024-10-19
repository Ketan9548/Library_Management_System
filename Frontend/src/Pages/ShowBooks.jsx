import Spinner from "../Components/Spinner";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import { useEffect, useState } from "react";

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:9990/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 font-bold">Show Book</h1>
      <div className="flex justify-center mt-7">
        {loading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Id</span>
              <span>{book._id}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Title</span>
              <span>{book.title}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Author</span>
              <span>{book.author}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Publish Year</span>
              <span>{book.Publishyear}</span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">Create Time</span>
              <span>
                {book.createdAt ? new Date(book.createdAt).toString() : "N/A"}
              </span>
            </div>
            <div className="my-4">
              <span className="text-xl mr-4 text-gray-500">
                Last Update Time
              </span>
              <span>
                {book.updatedAt ? new Date(book.updatedAt).toString() : "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBooks;
