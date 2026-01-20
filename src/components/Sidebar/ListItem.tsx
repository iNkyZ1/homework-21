import { Paper, Text } from "@mantine/core";

type Props = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

export function ListItem({ title, isActive, onClick }: Props) {
  return (
    <Paper
      withBorder
      p="sm"
      radius="md"
      onClick={onClick}
      style={{
        cursor: "pointer",
        userSelect: "none",
        opacity: isActive ? 1 : 0.9,
      }}
    >
      <Text fw={600} lineClamp={1}>
        {title}
      </Text>
    </Paper>
  );
}
