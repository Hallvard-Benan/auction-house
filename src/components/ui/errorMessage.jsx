import { MdOutlineErrorOutline } from "react-icons/md";
function ErrorMessage({ error }) {
  return (
    <div className="px-auto text-center p-10 flex flex-col items-center gap-6">
      Something went wrong!{" "}
      {error.message.includes("429") ? (
        <h2>The servers are currently overloaded, please try again later</h2>
      ) : error.message.includes("401") ? (
        <h2>Not authorized, Please log in</h2>
      ) : error.message.includes("404") ? (
        <h2>Error, what you are looking for does not exist </h2>
      ) : (
        <h2>{error.message}</h2>
      )}
      <p className="text-3xl">
        <MdOutlineErrorOutline />
      </p>
    </div>
  );
}

export default ErrorMessage;
