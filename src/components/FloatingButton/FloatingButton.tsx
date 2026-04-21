import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { FloatingButtonProps } from "./types";

export function FloatingButton({ count = 0, onClick }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onClick}
        className="cursor-pointer relative flex items-center justify-center w-14 h-14 rounded-full
          border border-orange-500 text-orange-400 text-xl shadow-lg shadow-black/40 bg-neutral-950
          hover:bg-orange-500/10 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <FontAwesomeIcon size="1x" icon={faArrowUp} />

        {count > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center
              text-[10px] font-semibold bg-orange-500 text-black rounded-full border border-neutral-900"
          >
            {count}
          </span>
        )}
      </button>
    </div>
  );
}
