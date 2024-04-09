"use client";
import React from "react";
import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import styles from "./CustomSimpleMDE.module.css";
import "easymde/dist/easymde.min.css";
// const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
//   // loading: () => {
//   //   return <p>Loading...</p>;
//   // },
//   ssr: false, //This disables pre-rendering on the server and is a fail-safe for in case you are trying to access certain browser APIs on the server they may not be available leading to errors
// });
interface Props {
  borderColor: string;
  borderWidth: string;
  //   hookFormInstance: any;
  control: any;
}
const CustomSimpleMDE = ({ borderColor, borderWidth, control }: Props) => {
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
        [`${styles.borderThin}`]: !isFocused,
        "border-transparent rounded-md": !isFocused,
        // "border-1": isFocused,
        [`border-plum `]: isFocused,
        [`${styles.borderThin} rounded-md`]: isFocused,
        // "rounded-sm": isFocused,
        // "rounded-md": isFocused,
      })}
    >
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, value } }) => (
          <SimpleMDE
            placeholder="Describe your issue"
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            // options={{
            //   autosave: { uniqueId: "issue-tracker", enabled: true },
            //   tabSize: 4,
            //   toolbar: false,
            //   toolbarTips: false,
            // }}
            // ref={ref}

            // onFocus={handleFocus}
            // {...field}
          />
        )}
      />

      {/* //   <SimpleMDE
    //     placeholder="Describe your issue"
    //     // autoFocus={true}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
    //     // options={{
    //     //   toolbar: ["bold", "italic", "heading"],
    //     //   spellChecker: true,
    //     // }}
    //   ></SimpleMDE> */}
    </div>
  );
};

export default CustomSimpleMDE;
