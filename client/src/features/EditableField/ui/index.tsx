import { Input, InputNumber, StatisticProps } from "antd";

import { BookInputType } from "@/entities/book";

interface EditableFieldProps<T extends StatisticProps["value"]> {
  id: string;
  type: BookInputType;
  initValue?: T;
  onChange?: any;
}
export const EditableField = <T extends StatisticProps["value"]>({
  id,
  type,
  initValue,
  onChange,
}: EditableFieldProps<T>) => {
  switch (type) {
    case "date":
      return (
        <InputNumber
          id={id}
          min={0}
          max={new Date().getFullYear()}
          style={{ width: "100%" }}
          defaultValue={initValue}
          onChange={onChange}
        />
      );
    case "textarea":
      return (
        <Input.TextArea defaultValue={initValue} onChange={onChange} id={id} />
      );
    default:
      return (
        <Input defaultValue={initValue} onChange={onChange} id={id} />
      );
  }
}
