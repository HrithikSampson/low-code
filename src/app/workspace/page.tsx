import MessagePanel from "@/components/MessagePanel";
import Workspace from "@/components/Workspace";
import Navbar from "@/components/Navbar";

export default function WorkspacePage() {
  return (
    <main>
      <Navbar />
      <div>
        <Workspace />
        <MessagePanel />
      </div>
    </main>
  );
}
