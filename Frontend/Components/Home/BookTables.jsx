import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const BookTables = ({ datas }) => {
  return (
    <div className="overflow-auto">
      <table className="table-auto w-full text-left border border-slate-500">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-slate-600 p-2">No</th>
            <th className="border border-slate-600 p-2">Book Title</th>
            <th className="border border-slate-600 p-2">Author</th>
            <th className="border border-slate-600 p-2">Publish Year</th>
            <th className="border border-slate-600 p-2">Operation</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((book, index) => (
            <tr key={book._id} className="hover:bg-gray-100">
              <td className="border border-slate-600 p-2">{index + 1}</td>
              <td className="border border-slate-600 p-2">{book.title}</td>
              <td className="border border-slate-600 p-2">{book.author}</td>
              <td className="border border-slate-600 p-2">
                {book.Publishyear}
              </td>
              <td className="border border-slate-600 p-4">
                <div className="flex justify-center">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl ml-2 text-green-800 hover:text-green-600" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl ml-2 text-yellow-500 hover:text-yellow-400" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl ml-2 text-red-700 hover:text-red-500" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTables;
