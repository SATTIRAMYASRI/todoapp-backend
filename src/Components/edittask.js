"use client";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import ColorConstants from "../constants/colors";

const Edittask = ({ task, onSave, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    onSave({ ...task, title, status });
    onClose();
  };

  return (
    <Popup open={true} closeOnDocumentClick onClose={onClose}>
      <div className="modal flex justify-center align-middle">
        <div
          style={{
            background: ColorConstants.secondaryBg,
            borderColor: ColorConstants.border,
          }}
          className="flex flex-col p-5 w-5/7 rounded-lg border-2 h-auto"
        >
          <div className="flex justify-between items-center mb-2">
            <h2>Edit Task</h2>
            <a
              style={{
                background: ColorConstants.thirdBg,
                borderColor: ColorConstants.border,
              }}
              className="pl-2 pr-2 pt-1 pb-1  close rounded-sm"
              onClick={onClose}
            >
              &times;
            </a>
          </div>
          <div className="modal">
            <input
              type="text"
              value={title}
              style={{
                background: ColorConstants.secondaryBg,
                color: ColorConstants.primaryText,
                borderColor: ColorConstants.thirdBg,
              }}
              className="p-2 my-2 w-full rounded-lg border-2  focus:outline-none mb-2"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                background: ColorConstants.secondaryBg,
                color: ColorConstants.primaryText,
                borderColor: ColorConstants.thirdBg,
              }}
              className="p-2 my-2 w-full rounded-lg border-2"
            >
              <option value="in progress">In Progress</option>
              <option value="pending">Pending</option>
              <option value="done">Done</option>
              <option value="hold">Hold</option>
            </select>
            <br />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              style={{
                background: ColorConstants.secondaryBg,
                color: ColorConstants.highlet,
                borderColor: ColorConstants.thirdBg,
              }}
              className="px-3 py-1 rounded-lg border-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default Edittask;
