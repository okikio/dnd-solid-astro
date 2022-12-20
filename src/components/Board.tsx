import { For } from "solid-js";
import { dndzone } from "solid-dnd-directive";
import { Column } from "./Column";
import s from "./styles.css";

export function Board(props) {
  function handleDndColumnsSorted(e) {
    props.onColumnItemsChange("columnItems", e.detail.items);
  }
  function handleDndCardsSorted(cid, e) {
    props.onColumnItemsChange(
      "columnItems",
      (column) => column.id === cid,
      "items",
      e.detail.items
    );
  }

  return (
    <section
      class={s.board}
      use:dndzone={{
        items: () => props.board.columnItems,
        type: "column",
        flipDurationMs: 250
      }}
      on:consider={handleDndColumnsSorted}
      on:finalize={handleDndColumnsSorted}
    >
      <For each={props.board.columnItems}>
        {(column) => (
          <div class={s.column}>
            <Column
              key={column.id}
              name={column.name}
              items={column.items}
              onItemsChange={(e) => handleDndCardsSorted(column.id, e)}
            />
          </div>
        )}
      </For>
    </section>
  );
}
