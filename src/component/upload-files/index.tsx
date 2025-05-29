import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { UploaderComponent } from "@syncfusion/ej2-react-inputs";

const UploadFiles = ({ name, multiple = false }: any) => {
  const { control, getValues, setValue } = useFormContext();

  const path = {
    removeUrl:
      "https://services.syncfusion.com/react/production/api/FileUploader/Remove",
    saveUrl:
      "https://services.syncfusion.com/react/production/api/FileUploader/Save",
  };

  function onUploadSuccess(args: any) {
    if (args.operation === "upload") {
      const uploadedFiles = getValues(name) || [];
      setValue(name, [...uploadedFiles, args.file]);
      console.log("File uploaded successfully", args.file);
    }
  }

  function onUploadFailure(args: {
    file: any;
    operation: string;
    e: ProgressEvent;
  }) {
    console.log("File failed to upload", args);
  }

  function onDeleteFile(args: any) {
    // const remainingFiles = (getValues(name) || []).filter(
    //   (file: any) => file.name !== args.file.name
    // );
    // setValue(name, remainingFiles);
    console.log("File deleted successfully", args.file);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={() => (
        <div className="fileuploadbtn">
          <UploaderComponent
            id="previewfileupload"
            type="file"
            autoUpload={false}
            asyncSettings={path}
            success={onUploadSuccess}
            failure={onUploadFailure}
            removing={onDeleteFile}
            multiple={multiple}
          />
        </div>
      )}
    />
  );
};

export default UploadFiles;
