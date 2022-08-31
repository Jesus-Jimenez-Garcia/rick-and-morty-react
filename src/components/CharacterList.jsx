import { useState, useEffect } from "react";
import Character from "./Character";

function NavPage({ page, setPage }) {
  return (
    <header className="d-flex justify-content-between align-items-center">
      <p>Page: {page}</p>
      <button
        className="btn btn-primary"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Page: {page + 1}
      </button>
    </header>
  );
}

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    };

    fetchData();
  }, [page]);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div id="columns" className="col-md-4" key={character.id - 1}>
                <Character character={character} />
              </div>
            );
          })}
        </div>
      )}
            <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default CharacterList;
