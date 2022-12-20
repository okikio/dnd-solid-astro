import { For } from 'solid-js';
import { dndzone } from 'solid-dnd-directive';
import s from './styles.css';
export function Column(props) {
  function handleClick() {
    alert('dragabble elements are still clickable :)');
  }
  return (
    <div class={s.wrapper}>
      <div class={s.columnTitle}>{props.name}</div>
      <div
        class={s.columnContent}
        use:dndzone={{ items: () => props.items, zoneTabIndex: -1 }}
        on:consider={props.onItemsChange}
        on:finalize={props.onItemsChange}
      >
        <For each={props.items}>
          {(item) => (
            <div class={s.card} onClick={handleClick}>
              {item.name}
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
