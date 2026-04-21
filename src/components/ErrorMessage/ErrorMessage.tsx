import { ErrorMessageProps } from "./types";

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="max-w-md w-full bg-[#121212] border border-[#1f1f1f] rounded-lg p-5 text-center">
        <h2 className="text-gray-400 text-sm mb-5">{message}</h2>
      </div>
    </div>
  );
}
