import { components } from "react-select";

export const DotOption = (props: any) => (
  <components.Option {...props}>
    <span className={`${props.data.className} me-2`}></span>
    {props.data.label}
  </components.Option>
);

export const DotSingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <span className={props.data.className}></span>
    {props.data.label}
  </components.SingleValue>
);
