import { useState, useCallback, useEffect, useRef, KeyboardEvent as ReactKeyboardEvent } from "react";
import mermaid from "mermaid";
import ReactFlow, {
  Background, Controls, MiniMap, Handle,
  addEdge, Connection, Edge, Node, ReactFlowProvider, applyNodeChanges, applyEdgeChanges,
  Position, MarkerType, NodeProps
} from "react-flow-renderer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Dock from "@/Components/Dock/Dock";
import { Plus, ArrowRight, RefreshCcw, Download, Maximize2, Save, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { invoke } from "@tauri-apps/api/core";

// Custom node component with connectors (handles) and inline editing
const CustomNode = ({ data, isConnectable, id, selected }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nodeName, setNodeName] = useState(data.label || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const onNodeDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(evt.target.value);
  };

  const handleInputKeyDown = (evt: ReactKeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      data.onChange(id, nodeName);
      setIsEditing(false);
    } else if (evt.key === "Escape") {
      setNodeName(data.label);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    data.onChange(id, nodeName);
    setIsEditing(false);
  };

  return (
    <div 
      className={`bg-white border-2 ${selected ? 'border-blue-500' : 'border-gray-200'} rounded-md p-5 shadow-lg min-w-[200px] min-h-[80px] flex items-center justify-center`}
      onDoubleClick={onNodeDoubleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={true}
        className="w-6 h-6 bg-blue-500 border-2 border-white cursor-crosshair hover:bg-blue-600 hover:scale-110 transition-all"
        style={{ zIndex: 10 }}
      />
      {isEditing ? (
        <Input
          ref={inputRef}
          value={nodeName}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleBlur}
          className="text-center font-semibold text-xl py-2 w-full"
          autoFocus
        />
      ) : (
        <div className="text-center font-semibold py-2 flex flex-col items-center">
          <div className="text-xl text-black mb-2">{data.label}</div>
          <div className="text-xs text-gray-500">Duplo clique para editar</div>
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={true}
        className="w-6 h-6 bg-blue-500 border-2 border-white cursor-crosshair hover:bg-blue-600 hover:scale-110 transition-all"
        style={{ zIndex: 10 }}
      />
    </div>
  );
};

// Register the custom node
const nodeTypes = {
  customNode: CustomNode,
};

// Save file to disk function (adapted from CodeEditor.tsx)
async function saveFileToDisk(name: string, content: string): Promise<void> {
  try {
    console.log('Saving file:', name);
    
    // Ensure directory exists
    await invoke("ensure_dir", { dirname: "" });
    
    // Write file
    await invoke("write_file", { filename: name, content });
    console.log('File saved successfully');
    toast.success("Diagrama salvo com sucesso!");
  } catch (error) {
    console.error("Error saving file:", error);
    toast.error(`Erro ao salvar: ${error}`);
    throw error;
  }
}

export default function DiagramStudio() {
  const [mode, setMode] = useState<"code" | "canvas">("canvas");
  const [mermaidCode, setMermaidCode] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [svg, setSvg] = useState<string>("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [filename, setFilename] = useState("diagram.mmd");
  
  const reactFlowRef = useRef(null);

  // Add function to handle node label changes
  const handleNodeLabelChange = useCallback((nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
              onChange: handleNodeLabelChange,
            },
          };
        }
        return node;
      })
    );
  }, []);

  function flowToMermaid(nodes: Node[], edges: Edge[]) {
    const header = "graph TD";
    const nodesStr = nodes
      .map((n) => `    ${n.id}[${n.data?.label || n.id}]`)
      .join("\n");
    const edgesStr = edges
      .map((e) => `    ${e.source} --> ${e.target}`)
      .join("\n");
    return [header, nodesStr, edgesStr].join("\n");
  }

  const renderMermaid = useCallback(async (code: string) => {
    try {
      const { svg } = await mermaid.render("mmd", code);
      setSvg(svg);
    } catch (err) { console.error(err); }
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => 
      addEdge({
        ...params,
        animated: true,
        style: { stroke: '#555', strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#555',
          width: 25,
          height: 25,
        },
      }, eds)),
    []
  );

  useEffect(() => {
    if (mode === "canvas") {
      const code = flowToMermaid(nodes, edges);
      setMermaidCode(code);
    }
  }, [nodes, edges]);

  useEffect(() => {
    if (mode === "code" || previewOpen) {
      renderMermaid(mermaidCode);
    }
  }, [mermaidCode, mode, previewOpen, renderMermaid]);

  const handleAddNode = () => {
    const id = (nodes.length + 1).toString();
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "customNode",
        data: { 
          label: `Nó ${id}`,
          onChange: handleNodeLabelChange,
        },
        position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
        style: { fontSize: '16px' },
      },
    ]);
  };

  const handleAddEdge = () => {
    if (nodes.length >= 2) {
      setEdges((eds) => [
        ...eds,
        {
          id: `e${nodes.length - 1}-${nodes.length}`,
          source: nodes[nodes.length - 2].id,
          target: nodes[nodes.length - 1].id,
          animated: true,
          style: { stroke: '#555', strokeWidth: 3 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#555',
            width: 25,
            height: 25,
          },
        },
      ]);
    }
  };

  const handleReset = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleExportSVG = () => {
    if (!svg) return;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "diagram.svg";
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleSaveDiagram = async () => {
    const name = prompt("Digite o nome do arquivo:", filename);
    if (!name) return;
    
    setFilename(name);
    const finalName = name.endsWith('.mmd') ? name : `${name}.mmd`;
    
    try {
      await saveFileToDisk(finalName, mermaidCode);
    } catch (error) {
      console.error("Erro ao salvar diagrama:", error);
    }
  };

  const dockItems = [
    {
      label: "Adicionar Nó",
      icon: <Plus />,
      onClick: handleAddNode,
    },
    {
      label: "Adicionar Aresta",
      icon: <ArrowRight />,
      onClick: handleAddEdge,
    },
    {
      label: "Resetar",
      icon: <RefreshCcw />,
      onClick: handleReset,
    },
    {
      label: "Exportar SVG",
      icon: <Download />,
      onClick: handleExportSVG,
    },
    {
      label: "Salvar Diagrama",
      icon: <Save />,
      onClick: handleSaveDiagram,
    },
    {
      label: "Visualizar",
      icon: <Eye />,
      onClick: () => setPreviewOpen(true),
    },
  ];

  const validNodes = nodes.filter(n => n.position && typeof n.position.x === 'number' && typeof n.position.y === 'number');

  return (
    <div className="flex flex-col h-[calc(100vh-60px)] max-w-[1800px] mx-auto p-2">
      {/* Canvas em tela cheia */}
      <section className="flex-1 bg-background rounded-xl shadow-lg p-4 border flex flex-col h-[calc(100vh-80px)]">
        <header className="mb-2 flex items-center justify-between">
          <h2 className="font-bold text-lg">Canvas de Fluxo</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Arraste, conecte e edite nós!</span>
            <Button variant="outline" size="sm" onClick={handleSaveDiagram}>
              <Save className="mr-2 h-4 w-4" /> Salvar
            </Button>
            <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" /> Visualizar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Preview do Diagrama</DialogTitle>
                </DialogHeader>
                <div className="bg-white rounded p-4 max-h-[70vh] overflow-auto">
                  {svg ? (
                    <div dangerouslySetInnerHTML={{ __html: svg }} />
                  ) : (
                    <p className="text-center text-muted-foreground">Nenhum diagrama para visualizar</p>
                  )}
                </div>
                <Button onClick={handleExportSVG} disabled={!svg}>
                  <Download className="mr-2 h-4 w-4" /> Exportar SVG
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </header>
        <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="h-[calc(100%-40px)] flex flex-col">
          <TabsList className="mb-2">
            <TabsTrigger value="canvas">Canvas</TabsTrigger>
            <TabsTrigger value="code">Código</TabsTrigger>
          </TabsList>
          <TabsContent value="canvas" className="flex-1 h-[calc(92vh-160px)]">
            <div className="h-full w-full border rounded bg-dot-black/[0.15] relative">
              <ReactFlowProvider>
                <ReactFlow
                  ref={reactFlowRef}
                  nodes={validNodes}
                  edges={edges}
                  onNodesChange={onNodesChange as any}
                  onEdgesChange={onEdgesChange as any}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  fitView
                  snapToGrid
                  snapGrid={[20, 20]}
                  minZoom={0.2}
                  maxZoom={4}
                  defaultZoom={1.2}
                  nodesDraggable={true}
                  elementsSelectable={true}
                  selectNodesOnDrag={false}
                  style={{ height: '100%', width: '100%' }}
                  defaultEdgeOptions={{
                    animated: true,
                    style: { strokeWidth: 3, stroke: '#555' },
                    markerEnd: {
                      type: MarkerType.ArrowClosed,
                      color: '#555',
                      width: 25,
                      height: 25,
                    }
                  }}
                >
                  <Background size={4} gap={25} color="#333333" />
                  <Controls showInteractive={true} className="scale-125" />
                  <MiniMap nodeStrokeWidth={3} nodeColor="#555" />
                </ReactFlow>
              </ReactFlowProvider>
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="h-[calc(100vh-160px)] flex flex-col">
            <Textarea
              value={mermaidCode}
              onChange={(e) => setMermaidCode(e.target.value)}
              className="font-mono flex-1 resize-none"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={() => renderMermaid(mermaidCode)}>
                Renderizar
              </Button>
              <Button variant="outline" onClick={() => setPreviewOpen(true)}>
                <Eye className="mr-2 h-4 w-4" /> Visualizar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Dock fixo na base */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Dock items={dockItems} />
      </div>
    </div>
  );
}
 