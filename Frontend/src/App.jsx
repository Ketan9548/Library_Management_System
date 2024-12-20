import "./App.css";
import { Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import CreateBook from "./Pages/CreateBook";
import DeleteBook from "./Pages/DeleteBook";
import EditBook from "./Pages/EditBook";
import ShowBooks from "./Pages/ShowBooks";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/books/create" element={<CreateBook/>}/>
        <Route path="/books/details/:id" element={<ShowBooks/>}/>
        <Route path="/books/edit/:id" element={<EditBook/>}/>
        <Route path="/books/delete/:id" element={<DeleteBook/>}/>
      </Routes>
    </>
  );
}

export default App;
