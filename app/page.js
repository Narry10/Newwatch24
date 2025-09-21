import Layout from "@/components/layout/Layout";
import HeroPost7 from "@/components/sections/HeroPost7";
import NewsPost1 from "@/components/sections/NewsPost1";
import Subscribe1 from "@/components/sections/Subscribe1";
export default function Home() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={"Blog"}>
        <HeroPost7 />
        <NewsPost1 />
        <Subscribe1 />
      </Layout>
    </>
  );
}
