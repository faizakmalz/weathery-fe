import ForecastDashboard from "@/components/forecasts/ForecastsDashboard";
import ForecastProvider from "@/context/ForecastContext";
import Layout from "@/layouts/Layout";

export default function Forecasts() {
  return (
    <ForecastProvider>
      <Layout>
        <ForecastDashboard />
      </Layout>
    </ForecastProvider>
  );
}
