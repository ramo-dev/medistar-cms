import { Loader } from "lucide-react";


const Loading = () => {
  return (
    <div className="h-[30vh] flex justify-center items-center w-full">
      <Loader className="animate-spin h-20 w-20 mx-auto" />
    </div>
  )
}

export default Loading;
