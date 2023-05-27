import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useAllCategoriesQuery,
  useCreateBlogMutation,
} from "../redux/blogSlice";
import { toast } from "react-toastify";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdCalendarMonth } from "react-icons/md";
import Select from "react-select";
import { Modal } from "../components";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [value, setValue] = useState("");
  const [postBlog, { isLoading }] = useCreateBlogMutation();
  const { data: categories } = useAllCategoriesQuery();
  const [category, setCategory] = useState([]);
  const [blogValues, setBlogValues] = useState({
    title: "",
    file: "",
    openPreview: false,
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (categories) {
      categories.map((category) =>
        setCategory((current) => [
          ...current,
          { value: category._id, label: category.category },
        ])
      );
    }
  }, [categories]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "bullet" }],
      [{ align: [] }],
      [("link", "image")],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value || !blogValues.title || !blogValues.file)
      return toast.error("Please provide all values");

    const form = new FormData();

    form.set("title", blogValues.title);
    form.set("body", value);
    form.append("category", JSON.stringify(selectedOption));
    form.append("coverPic", blogValues.file);

    try {
      const res = await postBlog(form).unwrap();
      toast.success(res.msg);
      setBlogValues((prev) => ({
        title: "",
        file: "",
        openPreview: false,
      }));
      setValue("");
      navigate(`/blog/${res.newBlog._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  const handleCoverPic = (e) => {
    setBlogValues((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handlePreview = () => {
    if (!value || !blogValues.title || !blogValues.file)
      return toast.error("Please provide all values");

    setBlogValues((prev) => ({
      ...prev,
      openPreview: !prev.openPreview,
    }));
  };

  const onClose = () => {
    setBlogValues((prev) => ({
      ...prev,
      openPreview: !prev.openPreview,
    }));
  };

  return (
    <div className="container mx-auto max-w-3xl px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
      <h2 className="text-center mb-5 text-xl font-semibold">Create New Blog</h2>
      <form action="submit" onSubmit={handleSubmit}>
        <div className="relative mb-3">
          <input
            type="text"
            required
            className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.3rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-800 dark:placeholder:text-neutral-500 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-1"
            placeholder="Add an impressive Title to your blog"
            value={blogValues.title}
            onChange={(e) =>
              setBlogValues((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex bg-teal-600 w-64 mb-2 rounded-lg">
            <label className="cursor-pointer hover:bg-cyan-600 text-white font-bold py-2 px-4 w-full inline-flex items-center rounded-lg">
              <AiOutlineCloudUpload className="text-black h-5 w-5 mr-2" />
              <span className="text-base leading-normal">
                {blogValues.file ? "Uploaded" : "Upload A Cover Picture"}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleCoverPic}
                required
              />
            </label>
          </div>
          <div className="md:w-2/4 mb-2">
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={category}
              isMulti={true}
              placeholder="Select Blog Category"
              required
            />
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          placeholder="Write something"
          className="h-72 mb-20 md:mb-12"
        />
        <div className="flex justify-center">
          <button
            onClick={handlePreview}
            className="bg-primary text-white font-bold text-lg py-2 px-4 mr-2 rounded-lg my-2"
            type="button"
          >
            {!blogValues.openPreview ? "Preview" : "Cancel"}
          </button>
        </div>
        <div className="flex justify-center"></div>
      </form>
      {blogValues.openPreview && (
        <Modal
          title="Blog Preview"
          value={value}
          openPreview={blogValues.openPreview}
          onClose={onClose}
          onSubmit={handleSubmit}
          blogValues={blogValues}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
export default AddBlog;
