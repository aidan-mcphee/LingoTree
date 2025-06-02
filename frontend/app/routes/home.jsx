import SquareGraph from "../components/SquareGraph";
import { useEffect, useState } from "react";
import { useLoginRequired } from "../utils/authGuard";
import { supabase_client } from "../components/supabase-client";

export default function Home() {

  useLoginRequired();

  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const { data, error } = await supabase_client
          .from('nodes')
          .select('*');
        if (error) throw error;
        setNodes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading knowledge tree...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <SquareGraph data={nodes} setNodes={setNodes} />
  );
}
