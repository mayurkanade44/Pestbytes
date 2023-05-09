import CommentForm from "./CommentForm";
import profile from "../assets/profile.svg";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useState } from "react";

const Comments = () => {
  const comments = [
    {
      _id: "10",
      user: {
        _id: "a",
        name: "Mohammad Rezaii",
      },
      desc: "it was a nice post, Thank you!",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
    },
    {
      _id: "11",
      user: {
        _id: "b",
        name: "Paul M. Williams",
      },
      desc: "a reply for Mohammad",
      post: "1",
      parent: "10",
      replyOnUser: "a",
      createdAt: "2022-12-31T17:22:05.092+0000",
    },
    {
      _id: "12",
      user: {
        _id: "b",
        name: "Paul M. Williams",
      },
      desc: "keep it up bro <3",
      post: "1",
      parent: null,
      replyOnUser: null,
      createdAt: "2022-12-31T17:22:05.092+0000",
    },
  ];

  const [affectedComment, setAffectedComment] = useState(null);

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {};

  return (
    <div className="mt-5">
      <CommentForm btnLabel="Post" formSubmitHandler={() => {}} />
      <div className="space-y-4 mt-8">
        {comments.map((comment) => (
          <div className="flex flex-nowrap items-start gap-x-3 bg-[#F2F4F5] p-3 rounded-lg">
            <img
              src={profile}
              alt="profile-pic"
              className="w-9 h-9 object-cover rounded-full"
            />
            <div className="flex-1 flex flex-col">
              <h5 className="font-bold text-dark-hard text-xs lg:text-sm">
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
              <p className="font-opensans mt-[10px] text-dark-light">
                {comment.desc}
              </p>
              <div className="flex items-center gap-x-3 text-dark-light font-roboto text-sm mt-5">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Comments;
