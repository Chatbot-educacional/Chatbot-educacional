import { useCallback, useEffect, useState } from "react";
import { pb } from "@/integrations/pocketbase/client";
import type { DrawingRecord } from "@/integrations/pocketbase/client";

export const useDrawings = (userId?: string | null) => {
  const [drawings, setDrawings] = useState<DrawingRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const list = await pb
        .collection("drawings")
        .getFullList<DrawingRecord>({
          filter: `user="${userId}"`,
          sort: "-updated",
        });
      setDrawings(list);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { drawings, loading, refresh, setDrawings };
};
