import { Stack, Text } from "@mantine/core";
import { useNotes } from "../../../entities/note/useNotes";
import { getNoteTitle } from "../../../entities/note/model/getNoteTitle";
import { SearchBox } from "./SearchBox";
import { ListItem } from "./ListItem";

export function NotesSidebar() {
  const {
    filteredNotes,
    selectedNoteId,
    searchQuery,
    setSearchQuery,
    selectNote,
  } = useNotes();

  return (
    <Stack gap="sm">
      <SearchBox value={searchQuery} onChange={setSearchQuery} />

      <Text size="sm" c="dimmed">
        Notes: {filteredNotes.length}
      </Text>

      <Stack gap="xs">
        {filteredNotes.map((note) => (
          <ListItem
            key={note.id}
            title={getNoteTitle(note.content)}
            isActive={note.id === selectedNoteId}
            onClick={() => selectNote(note.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
