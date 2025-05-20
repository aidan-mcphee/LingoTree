import SquareGraph from "../components/SquareGraph";
import { useEffect, useState } from "react";
import { useLoginRequired } from "../utils/authGuard";

export default function Home() {

  useLoginRequired();

  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await fetch('http://localhost:5000/nodeTest');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
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
    <SquareGraph data={nodes} />
  );
}
