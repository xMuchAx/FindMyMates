import { Sidebar } from "@/components/Sidebar";

const Home = () => {
  return (
    <main className="w-full h-full flex flex-col">
      <div className="bg-pink w-1/4"></div>
      <div className="w-3/4 flex justify-between">
        <Sidebar className="hidden lg:block bg-red" />
        <div className="w-2/3 bg-red">
          <p className="text-2xl text-blue ">hello</p>
        </div>
      </div>
    </main>
  );
};

export default Home;
