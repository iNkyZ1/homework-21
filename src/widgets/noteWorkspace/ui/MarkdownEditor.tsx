import SimpleMdeReact from "react-simplemde-editor";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function MarkdownEditor({ value, onChange }: Props) {
  return (
    <SimpleMdeReact
      value={value}
      onChange={onChange}
      options={{
        spellChecker: false,
        status: false,
        autofocus: true,
      }}
    />
  );
}
