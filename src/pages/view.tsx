import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BaseBoradInterface from "../interface/base-borad-interface";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [state, setState] = useState<BaseBoradInterface>();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://api.cozyfex.com/api/base-board/${id}/`,
      responseType: "json",
      headers: {
        Authorization: "Token a6e827f558105cd66b1f62b46500d39ba0764cc7",
      },
    })
      .then(function (res) {
        console.log(res);
        setState(res.data);
      })
      .catch(function (error) {
        alert("에러났어요");
        navigate(-1);
      });
  }, []);

  const handleChangeModify = () => {
    navigate(`/modify/${id}`);
  };
  const handleChangeSave = () => {
    navigate("/");
  };

  return (
    <div id="write">
      <ul>
        <li>
          <p>Id</p>
          <div className="number">{id}</div>
        </li>
        <li>
          <p>*Title</p>
          <div>{state?.title}</div>
        </li>
        <li>
          <p>*Name</p>
          <div>{state?.name}</div>
        </li>
        <li>
          <p>*Content</p>
          <div className="contentBox">{state?.content}</div>
        </li>
      </ul>
      <div className="buttonBox">
        <button type="button" onClick={handleChangeModify}>
          수정
        </button>
        <button type="button" onClick={handleChangeSave}>
          목록
        </button>
      </div>
    </div>
  );
};

export default View;
