import ConstructIQLogo from "../logo";
import FileUpload from "./uploadFile";
import Button from "../ui/button/Button";
import { FiUpload } from "react-icons/fi";

type UploadStep1 = {
  file: File | null;
  setFile: (file: File) => void;
};

const UploadStep1: React.FC<UploadStep1> = ({ file, setFile }) => {
  return (
    <div className="display flex flex-col items-center justify-center h-full ">
      <div>
        <div className="md:block hidden">
          <ConstructIQLogo />
        </div>
        <p className="text-[14px] mt-10 md:mt-6 text-black dark:text-white opacity-50">
          Let's estimate your next build faster.
        </p>
      </div>
      <div className="mt-12 flex flex-col gap-6">
        <FileUpload file={file} setFile={setFile} />
        <p className="text-[14px] text-black dark:text-white opacity-50 text-center">
          Drag and drop your blueprint above or use the upload button below.
          Supported format: PDF (max 25MB). You’ll see a success message when
          the upload is complete or instructions if something needs fixing. Your
          file is secure and used only for estimate purposes.
        </p>
        <div>
          <Button
            startIcon={<FiUpload color="#fff" size={20} />}
            className="w-full"
            variant="primary"
          >
            Upload your blueprint to start...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadStep1;
