import { Box } from "@mantine/core";
import { marked } from "marked";

type Props = {
  content: string;
};

export function MarkdownView({ content }: Props) {
  const html = marked.parse(content);

  return <Box dangerouslySetInnerHTML={{ __html: html }} />;
}
