import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <FontAwesomeIcon
        width="46"
        size="3x"
        className="animate-spin [animation-duration:1.2s] text-orange-500"
        icon={faSpinner}
      />
    </div>
  );
}
