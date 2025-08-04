/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Preview from "./preview";

const InitialEstimateType = {
  conversational_response: {
    intro_text: "�� Initial Assessment of [Sample Address] Plans (City, St):",
    project_details: {
      total_conditioned_space: "5,419.9 sq ft",
      first_floor: "2,205.0 sq ft",
      second_floor: "2,503.0 sq ft",
      third_floor: "511.3 sq ft",
      non_ac_areas: "1,141.9 sq ft",
      total_under_roof: "6,561.8 sq ft",
      lot_size: "6,968.8 sq ft",
      lot_coverage: "43.90%",
    },
    framing_notes: {
      title: "�� Framing Efficiency Notes:",
      items: [
        "Several interior walls are non-load-bearing 2x4 — can be pre-cut or panelized off-site for faster install.",
        "Vaulted and groin-vaulted ceilings in the master and entry hall areas will require skilled labor and coordination.",
      ],
    },
    cost_savings: {
      title: "💰 Cost Savings Insights:",
      items: [
        "There are 40+ custom-sized windows across three floors. Consider value-engineering to standard manufacturer sizes.",
        "The roof plan shows a multi-pitch system with multiple ridges, gables, and dormers.",
      ],
    },
  },
};

interface InitialAssesmentProps {
  setFile: (file: File) => void;
}

const InitialAssesment: React.FC<InitialAssesmentProps> = ({ setFile }) => {

  const [initialEstimate, setInitialEstimate] = useState("");
  const [fileName, setFileName] = useState<string>(
    localStorage.getItem("uploadedFile") || ""
  );

  const fileToSend = {
    name: fileName,
  };

  useEffect(() => {
    setInitialEstimate(JSON.stringify(InitialEstimateType));
  }, []);

  return (
    <div className="w-full">
      {initialEstimate &&
        JSON.stringify(InitialEstimateType) === initialEstimate && (
          <Preview
            file={fileToSend}
            setFile={setFile}
            setUploadProcessing={true}
            jasonData={initialEstimate}
          />
        )}
    </div>
  );
};

export default InitialAssesment;
