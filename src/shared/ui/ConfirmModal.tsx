import { Button, Group, Modal, Text } from "@mantine/core";

type Props = {
  opened: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
};

export function ConfirmModal({
  opened,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isDanger = false,
}: Props) {
  return (
    <Modal opened={opened} onClose={onCancel} title={title} centered>
      <Text>{description}</Text>

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onCancel}>
          {cancelLabel}
        </Button>

        <Button color={isDanger ? "red" : "blue"} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Group>
    </Modal>
  );
}
