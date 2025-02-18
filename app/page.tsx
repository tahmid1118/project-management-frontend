import type { NextPage } from "next";
import KanbanBoard from "./components/kanban";

const Home: NextPage = () => {
  return (
    <div>
      <KanbanBoard />
    </div>
  );
};

export default Home;
