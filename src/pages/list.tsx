import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BaseBoradInterface from "../interface/base-borad-interface";

const List = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<BaseBoradInterface[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.cozyfex.com/api/base-board/?page=${page}`,
      data: {},
      responseType: "json",
      headers: {
        Authorization: "Token a6e827f558105cd66b1f62b46500d39ba0764cc7",
      },
    })
      .then(function (res) {
        const response = res.data;
        const responseResults = response.results;
        console.log(responseResults);
        console.log(response);
        setState(responseResults);
        setPageCount(Math.ceil(response.count / 10));
      })
      .catch(function () {
        alert("error");
      });
  }, [page]);

  const handleChange = (
    event: React.MouseEvent<HTMLLIElement>,
    page: number
  ) => {
    setPage(page);
  };

  const handlePage = (id: number) => {
    navigate(`./view/${id}`);
  };

  const handleChangeSave = () => {
    navigate("./write");
  };

  return (
    <div id="list">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>Name</th>
            <th>Mod_date</th>
            <th>Reg_date</th>
          </tr>
        </thead>
        <tbody>
          {state.map((item) => (
            <tr key={item.id} onClick={() => handlePage(item.id)}>
              <td>
                {item.id}
                <Link to="./view"></Link>
              </td>
              <td>{item.title}</td>
              <td>
                <div>{item.content}</div>
              </td>
              <td>{item.name}</td>
              <td>{item.mod_date.toString()}</td>
              <td>{item.reg_date.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {[...Array(pageCount)].map((_, index) => (
          <li
            key={index + 1}
            onClick={(event) => handleChange(event, index + 1)}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <button type="button" className="writeButton" onClick={handleChangeSave}>
        글쓰기
      </button>
    </div>
  );
};

export default List;
