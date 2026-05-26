
export function DuplicateButton({ onDuplicate, text }) {


  return (
    <button type="button" onClick={onDuplicate}>
      {text}
    </button>

  );
}