import { useEffect, useState } from "preact/hooks";
import libros from "../../books.json";
import "./app.css";
import { BookComponent } from "./components/book.component";
import { Book, Libros } from "./types";
import { useBooks } from "./hooks/useBooks";

export function App() {
  const {
    librosDisponibles,
    librosLista,
    generos,
    addToList,
    removeFromList,
    setearLista,
  } = useBooks();

  const [selectedGenre, setSelectedGenre] = useState("all");

  const filterBooks = (e: any) => {
    setSelectedGenre(e.target.value);
  };

  useEffect(() => {
    const stgLectura = localStorage.getItem("lectura");
    if (stgLectura) setearLista(JSON.parse(stgLectura));

    addEventListener("storage", () => {
      const stgLectura = localStorage.getItem("lectura");
      if (stgLectura) setearLista(JSON.parse(stgLectura));
    });
  }, []);

  return (
    <>
      <article className="estanteria">
        <header>
          <h2>
            Libros disponibles (
            {
              librosDisponibles.filter((book) => {
                if (selectedGenre === "all") return true;
                return book.genre === selectedGenre;
              }).length
            }
            )
          </h2>
        </header>
        <div style={{ marginBottom: "15px" }}>
          {"Filtro "}
          <select onChange={filterBooks}>
            <option value="all">Todos</option>
            {generos.map((entry) => (
              <option value={entry}>{entry}</option>
            ))}
          </select>
        </div>
        <section>
          {librosDisponibles
            .filter((book) => {
              if (selectedGenre === "all") return true;
              return book.genre === selectedGenre;
            })
            .map((book) => {
              return (
                <BookComponent
                  book={book}
                  setSelected={setearLista}
                  seleccionados={librosLista}
                  addToList={addToList}
                  removeFromList={removeFromList}
                  zona="estanteria"
                />
              );
            })}
        </section>
      </article>
      <article className="estanteria-lectura">
        <header>
          <h2>Lista de lectura ({librosLista.length})</h2>
        </header>
        <section>
          {librosLista.map((b) => {
            return (
              <BookComponent
                book={b}
                setSelected={setearLista}
                seleccionados={librosLista}
                addToList={addToList}
                removeFromList={removeFromList}
                zona="lectura"
              />
            );
          })}
        </section>
      </article>
    </>
  );
}
