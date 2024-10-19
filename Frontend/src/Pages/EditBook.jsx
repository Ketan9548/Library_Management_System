import { useState, useEffect } from "react";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [Title, setTitle] = useState("");
  const [Author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://localhost:9990/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.Publishyear);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        alert(`Error editing the book detail in front end: ${err.message}`);
        console.log(err);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title: Title,
      author: Author,
      Publishyear: publishYear,
    };

    setLoader(true);
    axios
      .put(`http://localhost:9990/books/${id}`, data)
      .then(() => {
        setLoader(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoader(false);
        console.log("Error updating book:", err);
        enqueueSnackbar("Failed to update book", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loader ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={Author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditBook;
