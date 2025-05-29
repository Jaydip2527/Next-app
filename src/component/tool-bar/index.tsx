"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
// import ReactQuill from "react-quill-new";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

const ToolbarEditor = ({ name, isControl = false, selectedValue }: any) => {
  const { control, setValue } = useFormContext();
  const [editorValue, setEditorValue] = useState(selectedValue || "");

  // Watch for form reset or value changes
  const watchedValue = useWatch({ name });

  // Update value on initial load or edit
  useEffect(() => {
    setEditorValue(selectedValue || "");
    setValue(name, selectedValue || "");
  }, [selectedValue, name, setValue]);

  // Reset the editor when the form is reset
  useEffect(() => {
    if (watchedValue === undefined) {
      setEditorValue("");
      setValue(name, "");
    }
  }, [watchedValue]);

  return (
    <>
      <div>
        {isControl ? (
          <Controller
            name={name}
            control={control}
            defaultValue={selectedValue || ""}
            render={({ field, fieldState: { error } }) => (
              <>
                <ReactQuill
                  theme="snow"
                  value={field.value || ""}
                  onChange={(e: any) => {
                    field.onChange(e);
                    setEditorValue(e);
                  }}
                />
                {error && <p className="error-text">{error.message}</p>}
              </>
            )}
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={editorValue}
            onChange={(e) => setEditorValue(e)}
          />
        )}
      </div>
    </>
  );
};

export default ToolbarEditor;
