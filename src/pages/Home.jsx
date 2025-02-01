import DashboardContent from "@/components/home/DashboardContent";
import ForecastProvider from "@/context/ForecastContext";
import Layout from "@/layouts/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  return (
    <ForecastProvider>
      <Layout>
        <DashboardContent />
      </Layout>
    </ForecastProvider>
  );
}
