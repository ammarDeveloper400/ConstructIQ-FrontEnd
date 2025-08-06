// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import Upload from "../../components/upload";

export default function Home() {
  return (
    <>
      <PageMeta title="Construct IQ" description="Construct IQ" />
      <div className=" lg:w-[63%] md:w-[80%] w-[95%]  m-auto">
        <Upload />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div> */}

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
