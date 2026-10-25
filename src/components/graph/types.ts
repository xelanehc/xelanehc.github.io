export type GraphNodeKind =
  "center" | "area" | "experience" | "project" | "publication";

export type GraphNode = {
  id: string;
  kind: GraphNodeKind;
  label: string;
  /** Secondary label shown on hover (e.g. role). */
  hint?: string;
  href?: string;
  /** Kept on small screens, where the graph is trimmed. */
  essential?: boolean;
};

export type GraphEdge = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};
