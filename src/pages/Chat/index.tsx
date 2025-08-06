/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import UploadLayout from "../../components/upload/uploadLayout";
import Preview from "../../components/upload/preview";
import UploadProgress from "../../components/upload/UploadProgress";
import InitialAssesment from "../../components/upload/initialAssesment";
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
   <div className=" lg:w-[63%] md:w-[80%] w-[95%]  m-auto">
     <div className="w-full">
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
      
    </div>
   </div>
  );
};

export default Upload;
