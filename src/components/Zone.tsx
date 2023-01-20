import { ComponentProps } from "solid-js";

export function Zone(props: { num: number }) {
  return <div class={`zone zone-${props.num}`}></div>
}