import { Button } from "./button";
import { TfiClose } from "react-icons/tfi";

export default function Tag({ text, editable, handleOnRemove = null }) {
  return (
    <div className="bg-secondary px-4 py-1 rounded-lg flex items-center gap-1 ">
      <p className="text-secondary-foreground text-sm capitalize">{text}</p>
      {editable && (
        <Button
          onClick={handleOnRemove}
          className="rounded-full aspect-square p-0 bg-muted hover:bg-destructive-1/2 hover:text-destructive text-muted-foreground w-8 h-8"
        >
          <TfiClose />
        </Button>
      )}
    </div>
  );
}
