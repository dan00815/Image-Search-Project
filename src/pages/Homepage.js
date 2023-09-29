import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import Pictures from "../components/Pictures";
import axios from "axios";

const Homepage = () => {
  let [input, setInput] = useState("");
  let [data, setData] = useState([]);
  let [page, setPage] = useState(1);
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "yITweo3kUauiGDXN8zYFFjgwJxijTcoP1OeNSukQPfjTNVDEhgHNmqCN";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=9";
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&page=1&per_page=9`;

  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    });
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  const morePicture = async () => {
    setPage(page + 1);
    let newURL;
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page + 1}&per_page=9`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&page=${
        page + 1
      }&per_page=9`;
    }

    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    setData(data.concat(result.data.photos));
  };

  useEffect(() => {
    search(initialURL);
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Search
        search={() => {
          search(searchURL);
        }}
        setInput={setInput}
      />

      {/* 圖片展示區的components */}
      <div className="pictures">
        {data.map((d, index) => (
          <Pictures key={index} data={d} />
        ))}
      </div>

      {/* 更多按鈕 */}
      <div className="morePicture">
        <button onClick={morePicture}>Load More．．．</button>
      </div>
    </div>
  );
};

export default Homepage;
