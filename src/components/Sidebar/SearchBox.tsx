import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBox({ value, onChange }: Props) {
  return (
    <TextInput
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      leftSection={<IconSearch size={16} />}
    />
  );
}
