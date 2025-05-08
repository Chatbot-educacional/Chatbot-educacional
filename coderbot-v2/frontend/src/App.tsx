import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pb } from "@/integrations/pocketbase/client";
import { CodeEditorProvider } from "@/context/CodeEditorContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import Auth from "./pages/Auth";
import ChatInterface from "./pages/ChatInterface";
import CodeEditor from "./pages/CodeEditor";
import ExerciseInterface from "./pages/ExerciseInterface";
import LearningMetrics from "./pages/LearningMetrics";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Whiteboard from "./pages/Whiteboard";
import Home from "./home/Home";
import Mermaid from "./pages/Mermaid";
import FlashCardPage from "./pages/FlashCardPage";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CodeEditorProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="dashboard" element={<RequireAuth><Index /></RequireAuth>}>
                <Route path="chat" element={<ChatInterface />} />
                <Route path="playground" element={<CodeEditor />} />
                <Route path="exercises" element={<ExerciseInterface />} />
                <Route path="metrics" element={<LearningMetrics />} />
                <Route path="teacher" element={<TeacherDashboard />} />
                <Route path="student" element={<StudentDashboard />} />
                <Route path="whiteboard" element={<Whiteboard />} />
                <Route path="mermaid" element={<Mermaid />} />
                <Route path="flashcard" element={<FlashCardPage />} />
              </Route>
              <Route path="/profile" element={<RequireAuth><UserProfile /></RequireAuth>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CodeEditorProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;


const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Se não há sessão válida, redireciona
    if (!pb.authStore.isValid) {
      navigate('/auth');
    }
    setLoading(false);

    // Fica escutando logout externo (ex: expiração de token)
    const unsubscribe = pb.authStore.onChange(() => {
      if (!pb.authStore.isValid) {
        navigate('/auth');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) return null; // ou um spinner

  return children;
};
