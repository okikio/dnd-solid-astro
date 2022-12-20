import { createStore } from 'solid-js/store';
import { Board } from './Board';
import s from './styles.css';

function App() {
  const [board, setBoard] = createStore({
    columnItems: [
      {
        id: 1,
        name: 'TODO',
        items: [
          { id: 41, name: 'item41' },
          { id: 42, name: 'item42' },
          { id: 43, name: 'item43' },
          { id: 44, name: 'item44' },
          { id: 45, name: 'item45' },
          { id: 46, name: 'item46' },
          { id: 47, name: 'item47' },
          { id: 48, name: 'item48' },
          { id: 49, name: 'item49' },
          { id: 50, name: 'item50' },
          { id: 51, name: 'item51' },
        ],
      },
      {
        id: 2,
        name: 'DOING',
        items: [],
      },
      {
        id: 3,
        name: 'DONE',
        items: [],
      },
    ],
  });

  return (
    <main class={s.App}>
      <h4>
        Drag items or columns. Hold an item at the edge of a column to make the
        content scroll
      </h4>
      <hr />
      <Board board={board} onColumnItemsChange={setBoard} />
    </main>
  );
}

export default App;
