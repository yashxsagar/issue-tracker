"use client";
import React from "react";
import { useState } from "react";
// import SimpleMDE from "react-simplemde-editor";
import classNames from "classnames";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  loading: () => {
    return <p>Loading...</p>;
  },
  ssr: false, //This disables pre-rendering on the server and is a fail-safe for in case you are trying to access certain browser APIs on the server they may not be available leading to errors
});
interface Props {
  borderColor: string;
  borderWidth: string;
}
const CustomSimpleMDE = ({ borderColor, borderWidth }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div
      className={classNames({
        [`border-${borderWidth}`]: !isFocused,
        "border-transparent rounded-sm": !isFocused,
        // "border-1": isFocused,
        [`border-${borderWidth} rounded-md`]: isFocused,
        [`border-${borderColor}`]: isFocused,
        // "rounded-sm": isFocused,
        // "rounded-md": isFocused,
      })}
    >
      <SimpleMDE
        placeholder="Describe your issue"
        // autoFocus={true}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // options={{
        //   toolbar: ["bold", "italic", "heading"],
        //   spellChecker: true,
        // }}
      ></SimpleMDE>
    </div>
  );
};

export default CustomSimpleMDE;
