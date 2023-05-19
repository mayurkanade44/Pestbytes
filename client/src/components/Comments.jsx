import { FiEdit2, FiTrash } from "react-icons/fi";
import { useState } from "react";

const Comments = ({ comments, blogUser, userId }) => {
  const [affectedComment, setAffectedComment] = useState(null);
  const [value, setValue] = useState("");

  console.log();

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {};

  const submitHandler = (e) => {
    e.preventDefault();

    setValue("");
  };

  return (
    <div className="mt-5">
      <form onSubmit={submitHandler}>
        <div className="flex flex-col items-end border border-primary rounded-lg p-4">
          <textarea
            className="w-full focus:outline-none bg-transparent"
            rows="3"
            placeholder="Leave your comment here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
            {blogUser !== userId && (
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary text-white font-semibold"
              >
                Post
              </button>
            )}
          </div>
        </div>
      </form>

      <div className="space-y-4 mt-8">
        {comments?.map((comment) => (
          <div
            key={comment._id}
            className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg"
          >
            <img
              src={comment.user.avatar}
              alt="profile-pic"
              className="w-9 h-9 object-cover rounded-full"
            />
            <div className="flex-1 flex flex-col">
              <div className="flex items-center">
                <h5 className="font-bold text-dark-hard text-xs mr-3 lg:text-sm">
                  {comment.user.name}
                </h5>
                <span className="text-xs text-dark-light">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                  })}
                </span>
              </div>
              <p className="font-opensans my-1 text-dark-light">
                {comment.comment}
              </p>
              {userId === comment.user._id && (
                <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm">
                  <button
                    className="flex items-center space-x-2"
                    onClick={() =>
                      setAffectedComment({ type: "editing", _id: comment._id })
                    }
                  >
                    <FiEdit2 className="w-4 h-auto" />
                    <span>Edit</span>
                  </button>
                  <button
                    className="flex items-center space-x-2"
                    //   onClick={() => deleteComment(comment._id)}
                  >
                    <FiTrash className="w-4 h-auto" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comments;
