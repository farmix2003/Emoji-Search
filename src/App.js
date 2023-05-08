import "./App.css";
import { useEffect, useState } from "react";
const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(
      "https://emoji-api.com/emojis?access_key=67aa650ef7fb99e707292e4b6f59467bfbfddef4"
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [search]);
  let searchHandler = (e) => {
    setSearch(e.target.value);
  };
  const submitSearch = () => {
    if (search !== "") {
      fetch(
        `https://emoji-api.com/emojis?search=${search}&access_key=67aa650ef7fb99e707292e4b6f59467bfbfddef4`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setData(res);
          } else {
            setData([]);
          }
        });
    }
  };

  return (
    <div className="App">
      <div className="menu">
        <div className="menu_item">
          <h1> Emoji Search</h1>
          <p>A simple emoji search with React</p>
          <div>
            <input
              placeholder="search"
              type="text"
              value={search}
              onChange={(e) => searchHandler(e)}
            />
            <button className="search" onClick={() => submitSearch()}>
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        {data.map((e, i) => (
          <div className="card" key={e.slug}>
            <p className="emo">{e.character}</p>
            <p className="name">{e.unicodeName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
