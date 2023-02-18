import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const handleChangeWrite = () => {
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;
    const contentInput = document.getElementById("content") as HTMLInputElement;

    if (!titleInput.value) {
      alert("title 을 입력해주세요");
      titleInput.focus();
      return false;
    }

    if (!nameInput.value) {
      alert("name 을 입력해주세요");
      nameInput.focus();
      return false;
    }

    if (contentInput.value === "") {
      alert("content를 입력해주세요");
      contentInput.focus();
      return false;
    }

    axios({
      method: "post",
      url: "https://api.cozyfex.com/api/base-board/",
      data: { title, name, content },
      responseType: "json",
      headers: {
        Authorization: "Token a6e827f558105cd66b1f62b46500d39ba0764cc7",
      },
    }).then(function () {
      navigate("/");
      setTitle("");
      setContent("");
      setName("");
    });
  };

  const handleClickCancel = () => {
    navigate("/");
  };

  return (
    <div id="write">
      <ul>
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
        <button type="button" onClick={handleChangeWrite}>
          등록
        </button>
        <button type="button" onClick={handleClickCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default Write;
