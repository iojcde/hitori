import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="container flex items-center justify-center text-center ">
      <div className="pb-8">
        <AlertTriangle size="64" className="text-violet-11 mx-auto block" />
        <h1 className="text-2xl font-bold mt-4">Note not found...</h1>
        <p className="mt-2">
          The note you are looking for does not exist or has been deleted.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
