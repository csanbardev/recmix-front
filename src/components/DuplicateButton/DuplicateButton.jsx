
import { Button } from "@chakra-ui/react";

export function DuplicateButton({ onDuplicate, text }) {
  return (
    <Button type="button" onClick={onDuplicate} colorPalette="teal" variant="outline" alignSelf="flex-start">
      {text}
    </Button>
  );
}