
import { useState } from "react";
import { Lightbulb, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AnalogySettingsProps {
  analogiesEnabled: boolean;
  setAnalogiesEnabled: (enabled: boolean) => void;
  knowledgeBase: string;
  setKnowledgeBase: (base: string) => void;
}

export const AnalogySettings: React.FC<AnalogySettingsProps> = ({
  analogiesEnabled,
  setAnalogiesEnabled,
  knowledgeBase,
  setKnowledgeBase,
}) => {
  return (
    <div className="space-y-4">
      {/* Toggle for enabling/disabling analogies */}
      <div className="flex items-center justify-between space-x-2 rounded-lg border p-4">
        <Label htmlFor="analogy-mode" className="flex flex-col space-y-1">
          <span>Modo Analogia</span>
          <span className="font-normal leading-snug text-muted-foreground">
            Receber explicações usando analogias.
          </span>
        </Label>
        <Switch
          id="analogy-mode"
          checked={analogiesEnabled}
          onCheckedChange={setAnalogiesEnabled}
          aria-label="Ativar modo analogia"
        />
      </div>

      {/* Knowledge Base Input - Shown only when analogies are enabled */}
      {analogiesEnabled && (
        <div className="space-y-2 rounded-lg border p-4">
           <Label htmlFor="knowledge-base">
             Base de Conhecimento para Analogias (Opcional)
           </Label>
           <Textarea
             id="knowledge-base"
             placeholder="Ex: Explique como se eu fosse um chef de cozinha, use termos de Star Wars, etc."
             value={knowledgeBase}
             onChange={(e) => setKnowledgeBase(e.target.value)}
             className="min-h-[80px] resize-none" // Allow resizing if needed, or keep resize-none
             aria-label="Digite a base de conhecimento para as analogias"
           />
           <p className="text-sm text-muted-foreground">
             Forneça um contexto ou tema para guiar as analogias da IA.
           </p>
        </div>
      )}
    </div>
  );
};
