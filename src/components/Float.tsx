import { ComponentProps } from "solid-js";

export function Float(props: { num: number }) {
  return (<div class="float"> {props.num} </div>);
}
