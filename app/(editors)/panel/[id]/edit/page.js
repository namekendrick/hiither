import { BlockEditor } from "@/features/editor/components/block-editor";
import { Navbar } from "@/app/(editors)/_components/navbar";
import { getPrivatePanelByPanelId } from "@/db/panel";

const EditPanelPage = async ({ params }) => {
  const panel = await getPrivatePanelByPanelId(params.id);

  return (
    <div className="h-full overflow-auto">
      <Navbar panelId={params.id} isPublished={panel.isPublished} />
      <BlockEditor panelId={params.id} />
    </div>
  );
};

export default EditPanelPage;
