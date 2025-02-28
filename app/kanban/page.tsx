import { Metadata } from "next";
import KanbanBoard from "./kanban";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Kanban Board page",
};

const KanbanBoardPage = async () => {
  return (
    <>
      <KanbanBoard />
    </>
  );
};

export default KanbanBoardPage;
