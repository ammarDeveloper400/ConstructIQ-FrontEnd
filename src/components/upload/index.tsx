/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import UploadStep1 from "./uploadStep1";
import UploadLayout from "./uploadLayout";
import Preview from "./preview";
import UploadProgress from "./UploadProgress";
import InitialAssesment from "./initialAssesment";
//@ts-ignore

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProcessing, setUploadProcessing] = useState(false);
  const [initialScreenning, setInitialScreenning] = useState<boolean>(false);


  useEffect(() => {
    if (file === null) {
      setUploadProcessing(false);
      setInitialScreenning(false);
    }
  }, [file]);

  const handleScreening = () => {
    setInitialScreenning(true);
    setUploadProcessing(false);
  };
  return (
    <div className="w-full">
      {file && file.name !== null ? (
        <>
          {!uploadProcessing && !initialScreenning && (
            <UploadLayout chatLayout={false}>
              <Preview
                jasonData={null}
                file={file}
                setFile={setFile}
                setUploadProcessing={setUploadProcessing}
              />
            </UploadLayout>
          )}
          {uploadProcessing && (
            <UploadProgress setInitialScreenning={handleScreening} />
          )}
          {/* <UploadProgress /> */}

          {initialScreenning && (
            <UploadLayout chatLayout={true}>
              <InitialAssesment setFile={setFile} />
            </UploadLayout>
          )}
        </>
      ) : (
        <UploadStep1 file={file} setFile={setFile} />
      )}
    </div>
  );
};

export default Upload;
