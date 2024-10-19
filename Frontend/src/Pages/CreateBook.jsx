import { useState } from "react";
import BackButton from "../../Components/BackButton";
import Spinner from "../../Components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [Title, settitle] = useState("");
  const [Author, setauthor] = useState("");
  const [publishyear, setpublishyear] = useState('');
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlesavebook = () => {
    const data = {
      title:Title,
      author:Author,
      Publishyear:publishyear,
    };
    setloader(true);
    axios
      .post("http://localhost:9990/books", data)
      .then(() => {
        setloader(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
        navigate("/");
      })
      .catch((err) => {
        setloader(false); // Add this line to hide the loader on error
        console.log("Error adding book:", err);
        enqueueSnackbar('Failed to create book', { variant: 'error' });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loader ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={Title}
            onChange={(e) => settitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={Author}
            onChange={(e) => setauthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishyear}
            onChange={(e) => setpublishyear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handlesavebook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
