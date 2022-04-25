import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function Loading() {
  return (
    <div className="w-full h-24 flex items-center justify-center">
      <AiOutlineLoading3Quarters className="animate-spin h-7 w-7" />
    </div>
  );
}
