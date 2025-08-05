/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { CiFileOn } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import Button from "../ui/button/Button";

type PreviewProps = {
  file: any;
  setFile: any;
  setUploadProcessing: any;
  jasonData: any;
};

const Preview: React.FC<PreviewProps> = ({
  file,
  setFile,
  setUploadProcessing,
  jasonData,
}) => {
  const [zip, setZip] = useState("");
  const [reTag, setReTag] = useState(false);
  const [tags, setTags] = useState<string>("#investment1, #construction");
  const [projectType, setProjectType] = useState("");
  const [scope, setScope] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  // console.log("jasonData", jasonData);

  // const [data, setData] = useState<any>(null);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  useEffect(() => {
    setIsFormValid(zip.trim() !== "" && projectType !== "" && scope !== "");
  }, [zip, projectType, scope]);

  const updateTags = (newTags: string) => {
    setTags(newTags);
    localStorage.setItem("uploadedFileTags", newTags);
  };

  useEffect(() => {
    const fileTags = localStorage.getItem("uploadedFileTags");
    if (fileTags) {
      setTags(fileTags);
    }
  }, []);

  useEffect(() => {
    if (jasonData) {
      const parsedData = JSON.parse(jasonData);
      console.log("parsedData", parsedData);

      const detailCards = parsedData?.conversational_response?.project_details
        ? Object.entries(
            parsedData.conversational_response.project_details
          ).map(([key, value]) => {
            const label = key
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            return { key, label, value };
          })
        : [];

      setProjectDetails(detailCards);
      console.log("detailCards", detailCards);
    }
  }, [jasonData]);

  const zipCode = localStorage.getItem("zip");
  const projectTypes = localStorage.getItem("projectType");
  const scopes = localStorage.getItem("scope");

  // console.log("data", data);

  return (
    <div className="mt-4 mb-8 space-y-4 w-full">
      {/* ✅ Success Message */}
      <div className="flex justify-center items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.0001 2.00586C17.7981 2.00586 22.5001 6.70792 22.5001 12.5059C22.5001 18.3039 17.7981 23.006 12.0001 23.006C6.20206 23.006 1.5 18.3039 1.5 12.5059C1.5 6.70792 6.20206 2.00586 12.0001 2.00586ZM9.81959 15.9164L7.24892 13.3436C6.81097 12.9054 6.81088 12.1908 7.24892 11.7527C7.68706 11.3146 8.40484 11.3174 8.83978 11.7527L10.6521 13.5664L15.1605 9.058C15.5986 8.61986 16.3133 8.61986 16.7514 9.058C17.1895 9.49604 17.1889 10.2113 16.7514 10.6489L11.4462 15.954C11.0087 16.3915 10.2934 16.3921 9.85538 15.954C9.84307 15.9417 9.83119 15.9292 9.81959 15.9164Z"
            fill="#1FBE42"
          />
        </svg>
        <p className="text-black dark:text-white text-sm">
          The blueprint PDF has been successfully uploaded.
        </p>
      </div>

      {/* ✅ File Card */}
      {jasonData && (
        <div className=" bg-[#161D26] rounded-t-[8px] flex items-center gap-4 p-4 px-4 text-white text-sm mb-0 capitalize">
          <p>{projectTypes}</p>
          <p className="pr-4 border-r border-[#666a70]">{scopes}</p>
          <p className="">{zipCode}</p>
        </div>
      )}
      <div className={ `flex flex-col justify-center  bg-[#3F4854] ${jasonData === null ? "rounded-[8px]" : "rounded-t-[0px]"} rounded-[8px] px-3 py-3`} >
        <div className="flex items-center justify-between flex-col md:flex-row gap-2">
          <div className="flex items-start gap-1">
            <CiFileOn size={32} color="white" />
            <div className="flex flex-col gap-[2px]">
              <p className="text-white text-[14px] font-bold w-[190px] truncate">
                {file.name}
              </p>

              {reTag ? (
                <div className="relative">
                  <input
                    className="border border-[#5CA9FF] bg-[#1B2430] outline-none rounded-[4px] px-2 py-1 text-white text-[12px]"
                    value={tags}
                    onChange={(e) => updateTags(e.target.value)}
                  />
                  <RxCross2
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => setReTag(false)}
                    color="#5CA9FF"
                  />
                </div>
              ) : (
                <p className="text-white text-[12px]">{tags}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="flex gap-3 items-center text-xs font-medium text-[#5CA9FF]">
              <button onClick={() => setFile(null)}>Reupload</button>
              <span className="border-l border-[#666a70] h-4" />
              <button>Rename</button>
              <span className="border-l border-[#666a70] h-4" />
              <button onClick={() => setReTag(!reTag)}>
                {reTag ? "Done" : "Retag"}
              </button>
            </div>
            <button>
              <RxCross2
                onClick={() => setFile(null)}
                color="#5CA9FF"
                size={20}
              />
            </button>
          </div>
        </div>

        {jasonData !== null && (
          <div className="border-t-2 mt-2 border-[#666a70] pt-2">
            <div className="flex flex-col justify-center items-center gap-1">
              <p className="text-[14px] text-white opacity-70">
                I’ve reviewed your plan:
              </p>
              <p className="text-[14px] font-bold text-white">
                ⚠ 92% Confident, Outlier Scope
              </p>
              <div className=" bg-[#1B2430] border-2 border-[#1B2430] rounded-full h-[8px] mt-1 mb-2 w-[50%]">
                <div
                  className="bg-green-500 h-full rounded-full "
                  style={{ width: "92%" }}
                ></div>
              </div>
              <p className="text-[14px] font-bold text-white">
                🔍 Key Project Details (from Page 1):
              </p>
            </div>

            <div className="">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 border-b-2 border-[#666a70] pb-4">
                {projectDetails &&
                  projectDetails.map((item: any, index: any) => (
                    <div
                      key={index}
                      className="bg-[#1B2430] h-[170px] text-white p-3 rounded-md text-center flex flex-col justify-center"
                    >
                      <p className="text-[32px] font-bold leading-none">
                        {item.value?.split(" ")[0]}
                        <br />
                        <span className="text-[24px] font-bold mt-1">
                          {item.value?.split(" ")[1]}{" "}
                          {item.value?.split(" ")[2]}
                        </span>
                      </p>
                      <p className="text-[13px] opacity-70 mt-2">
                        {item.label}
                      </p>
                    </div>
                  ))}
              </div>

              <div className="flex justify-center gap-3 pt-4 text-white font-bold pb-2 text-[14px]">
                <p>Value Core: Avg: $185K</p>
                <p className="pl-3 border-l border-[#666a70]">
                  Value Core: Avg: $185K
                </p>
                <p className="pl-3 border-l border-[#666a70]">
                  Value Core: Avg: $185K
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {jasonData === null && (
        <>
          <p className="text-center dark:text-white opacity-50 text-[14px]">
            Thanks for uploading the LIVSMART - MECHANICAL.pdf plans. Before I
            dive into analysis, I need some quick details to tailor insights to
            your business operations:
          </p>

          {/* ✅ Form Section */}
          <div className="flex flex-col gap-4 md:w-[60%] w-[80%] mx-auto mt-6">
            <Input
              type="text"
              placeholder="ZIP"
              value={zip}
              onChange={(e) => {
                localStorage.setItem("zip", e.target.value);
                setZip(e.target.value);
              }}
            />
            <Select
              options={[
                { value: "marketing", label: "Marketing" },
                { value: "template", label: "Template" },
                { value: "development", label: "Development" },
              ]}
              placeholder="Project type"
              onChange={(value) => {
                localStorage.setItem("projectType", value);
                setProjectType(value);
              }}
            />
            <Select
              options={[
                { value: "marketing", label: "Marketing" },
                { value: "template", label: "Template" },
                { value: "development", label: "Development" },
              ]}
              placeholder="Scope"
              onChange={(value) => {
                localStorage.setItem("scope", value);
                setScope(value);
              }}
            />
          </div>

          <p className="text-black dark:text-white text-center mt-8 opacity-50">
            💡 If you’d prefer a standard mechanical analysis of this Hilton
            project (without customization), just reply “Skip”, and I’ll proceed
            with a general engineering breakdown.
          </p>

          <div className="mt-4 flex justify-center">
            <Button
              className="w-[50%]"
              variant="primary"
              size="md"
              disabled={!isFormValid}
              onClick={() => setUploadProcessing(true)}
            >
              Submit information
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Preview;
