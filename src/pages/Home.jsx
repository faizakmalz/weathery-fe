import DashboardContent from "@/components/home/DashboardContent";
import Layout from "@/layouts/Layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {

  return (
    <Layout>
      <DashboardContent/>
    </Layout>
  );
}
