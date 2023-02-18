import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BaseBoradInterface from "../interface/base-borad-interface";
import axios from "axios";

const Modify = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState<BaseBoradInterface>();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

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
        setTitle(res.data.title);
        setName(res.data.name);
        setContent(res.data.content);
      })
      .catch(function (error) {
        alert("에러났어요");
        navigate(-1);
      });
  }, []);

  const handleChangeModify = () => {
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const contentInput = document.getElementById("content") as HTMLInputElement;

    if (titleInput.value === "") {
      alert("title을 입력하세요");
      titleInput.focus();
      return false;
    }

    if (nameInput.value === "") {
      alert("name을 입력해주세요");
      nameInput.focus();
      return false;
    }

    if (contentInput.value === "") {
      alert("content를 입력해주세요.");
      contentInput.focus();
      return false;
    }

    axios({
      method: "put",
      url: `https://api.cozyfex.com/api/base-board/${id}/`,
      responseType: "json",
      data: { title, content, name },
      headers: {
        Authorization: "Token a6e827f558105cd66b1f62b46500d39ba0764cc7",
      },
    }).then(function (res) {
      navigate(`/view/${id}`);
    });
  };

  const handleChangeDelete = () => {
    axios({
      method: "delete",
      url: `https://api.cozyfex.com/api/base-board/${id}/`,
      responseType: "json",
      data: {},
      headers: {
        Authorization: "Token a6e827f558105cd66b1f62b46500d39ba0764cc7",
      },
    }).then(function (res) {
      navigate("/");
    });
  };

  const handleChangeCancel = () => {
    navigate(`/view/${id}`);
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
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </li>
        <li>
          <p>*Name</p>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </li>
        <li>
          <p>*Content</p>
          <textarea
            id="content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </li>
      </ul>
      <div className="buttonBox">
        <button type="button" onClick={handleChangeModify}>
          수정
        </button>
        <button type="button" onClick={handleChangeDelete}>
          삭제
        </button>
        <button type="button" onClick={handleChangeCancel}>
          취소
        </button>
      </div>
    </div>
  );
};
export default Modify;
