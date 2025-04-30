import { Trash2, PencilLine } from "lucide-react";
import toast from "react-hot-toast";
import { pb } from "@/integrations/pocketbase/client";
import type { DrawingRecord } from "@/integrations/pocketbase/client";

interface Props {
  items: DrawingRecord[];
  onOpen: (d: DrawingRecord) => void;
  onRefresh: () => void;
}

export const DrawingList = ({ items, onOpen, onRefresh }: Props) => {
  const handleDelete = async (id: string) => {
    const ok = confirm("Excluir este quadro?");
    if (!ok) return;
    await pb.collection("drawings").delete(id);
    toast.success("Excluído");
    onRefresh();
  };

  const handleRename = async (d: DrawingRecord) => {
    const newTitle = prompt("Novo título:", d.title) ?? "";
    if (!newTitle.trim() || newTitle === d.title) return;
    await pb.collection("drawings").update(d.id, { title: newTitle.trim() });
    toast.success("Renomeado");
    onRefresh();
  };

  if (!items.length) return <p className="text-sm text-muted-foreground">Nenhum quadro salvo.</p>;

  return (
    <ul className="space-y-2 max-h-64 overflow-y-auto">
      {items.map((d) => (
        <li key={d.id} className="flex items-center gap-2">
          <button
            onClick={() => onOpen(d)}
            className="flex-1 text-left truncate px-2 py-1 rounded hover:bg-muted"
          >
            {d.title || "Sem título"}
          </button>

          <button
            onClick={() => handleRename(d)}
            className="p-1 rounded hover:bg-muted"
            title="Renomear"
          >
            <PencilLine size={16} />
          </button>

          <button
            onClick={() => handleDelete(d.id)}
            className="p-1 text-red-600 rounded hover:bg-red-100"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
};
