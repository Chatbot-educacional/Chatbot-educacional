import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Save, 
  Upload, 
  RotateCcw, 
  Settings, 
  Terminal,
  FileText,
  Folder,
  Plus,
  Code,
  Code2,
  MessageSquare,
  Sparkles,
  X,
  Search,
  Clock,
  Shield,
  Trash2Icon,
  Zap,
  Home,
  Monitor,
  Moon,
  Sun,
  CheckCircle,
  XCircle,
  AlertTriangle,
  AlertCircle,
  MapPin,
  Loader2,
  BookOpen
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';
import CodeEditor from '@/components/chat/CodeEditor';
import ExamplesPanel from '@/components/chat/ExamplesPanel';
import { useExamples, type CodeExample } from '@/context/ExamplesContext';
import { useCodeEditor } from '@/context/CodeEditorContext';
import { useCodePersistence } from '@/hooks/useCodePersistence';
import { useMissionTracker } from '@/hooks/useMissionTracker';
import { Link, useNavigate } from 'react-router-dom';

// Função utilitária para execução segura de JavaScript
const executeJavaScriptSafely = (code: string, timeoutMs: number = 5000) => {
  return new Promise((resolve, reject) => {
    const logs: string[] = [];
    const errors: string[] = [];
    let result: any;
    let executionError: any = null;
    
    // Backup do console original
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };
    
    // Mock console para capturar outputs
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      },
      error: (...args: any[]) => {
        errors.push('ERROR: ' + args.map(arg => String(arg)).join(' '));
      },
      warn: (...args: any[]) => {
        logs.push('WARN: ' + args.map(arg => String(arg)).join(' '));
      },
      info: (...args: any[]) => {
        logs.push('INFO: ' + args.map(arg => String(arg)).join(' '));
      }
    };
    
    // Timeout para evitar loops infinitos
    const timeout = setTimeout(() => {
      // Restaurar console
      Object.assign(console, originalConsole);
      reject(new Error(`Execução cancelada: timeout de ${timeoutMs}ms excedido (possível loop infinito)`));
    }, timeoutMs);
    
    try {
      // Substituir console
      Object.assign(console, mockConsole);
      
      // Criar contexto seguro
      const safeGlobals = {
        console: mockConsole,
        Math,
        Date,
        JSON,
        Array,
        Object,
        String,
        Number,
        Boolean,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        setTimeout: () => { throw new Error('setTimeout não é permitido neste ambiente'); },
        setInterval: () => { throw new Error('setInterval não é permitido neste ambiente'); },
        fetch: () => { throw new Error('fetch não é permitido neste ambiente'); },
        XMLHttpRequest: () => { throw new Error('XMLHttpRequest não é permitido neste ambiente'); }
      };
      
      // Wrapper para execução isolada
      const wrappedCode = `
        (function(${Object.keys(safeGlobals).join(', ')}) {
          "use strict";
          ${code}
        })(${Object.keys(safeGlobals).map(key => `safeGlobals.${key}`).join(', ')});
      `;
      
      result = eval(wrappedCode);
      
    } catch (error) {
      executionError = error;
    } finally {
      clearTimeout(timeout);
      // Restaurar console original
      Object.assign(console, originalConsole);
    }
    
    resolve({
      result,
      logs,
      errors,
      executionError
    });
  });
};

// Função para executar código via Piston API
const executeCodeViaPiston = async (language: string, code: string, stdin: string = '') => {
  try {
    const response = await fetch('/api/piston/executar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        language: language,
        code: code,
        stdin: stdin
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Erro ao executar código via Piston:', error);
    throw error;
  }
};

// Templates iniciais para diferentes linguagens
const LANGUAGE_TEMPLATES = {
  javascript: `// Bem-vindo ao Editor de Código JavaScript
console.log("🚀 Hello, World!");

// Exemplo de função
function saudacao(nome) {
  return \`Olá, \${nome}! 👋\`;
}

console.log(saudacao("Desenvolvedor"));

// Exemplo com arrays
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0);
console.log("Números pares:", pares);`,
  
  python: `# Bem-vindo ao Editor de Código Python
print("🚀 Hello, World!")

# Exemplo de função
def saudacao(nome):
    return f"Olá, {nome}! 👋"

print(saudacao("Desenvolvedor"))

# Exemplo com listas
numeros = [1, 2, 3, 4, 5]
pares = [n for n in numeros if n % 2 == 0]
print("Números pares:", pares)`,

  java: `// Bem-vindo ao Editor de Código Java
public class Main {
    public static void main(String[] args) {
        System.out.println("🚀 Hello, World!");
        
        // Exemplo de método
        String mensagem = saudacao("Desenvolvedor");
        System.out.println(mensagem);
        
        // Exemplo com arrays
        int[] numeros = {1, 2, 3, 4, 5};
        System.out.print("Números pares: ");
        for (int num : numeros) {
            if (num % 2 == 0) {
                System.out.print(num + " ");
            }
        }
        System.out.println();
    }
    
    public static String saudacao(String nome) {
        return "Olá, " + nome + "! 👋";
    }
}`,

  cpp: `// Bem-vindo ao Editor de Código C++
#include <iostream>
#include <vector>
#include <string>

using namespace std;

string saudacao(const string& nome) {
    return "Olá, " + nome + "! 👋";
}

int main() {
    cout << "🚀 Hello, World!" << endl;
    
    // Exemplo de função
    cout << saudacao("Desenvolvedor") << endl;
    
    // Exemplo com vetores
    vector<int> numeros = {1, 2, 3, 4, 5};
    cout << "Números pares: ";
    for (int num : numeros) {
        if (num % 2 == 0) {
            cout << num << " ";
        }
    }
    cout << endl;
    
    return 0;
}`,

  c: `// Bem-vindo ao Editor de Código C
#include <stdio.h>
#include <string.h>

void saudacao(const char* nome) {
    printf("Olá, %s! 👋\\n", nome);
}

int main() {
    printf("🚀 Hello, World!\\n");
    
    // Exemplo de função
    saudacao("Desenvolvedor");
    
    // Exemplo com arrays
    int numeros[] = {1, 2, 3, 4, 5};
    int tamanho = sizeof(numeros) / sizeof(numeros[0]);
    
    printf("Números pares: ");
    for (int i = 0; i < tamanho; i++) {
        if (numeros[i] % 2 == 0) {
            printf("%d ", numeros[i]);
        }
    }
    printf("\\n");
    
    return 0;
}`,

  csharp: `// Bem-vindo ao Editor de Código C#
using System;
using System.Linq;

class Program 
{
    static void Main() 
    {
        Console.WriteLine("🚀 Hello, World!");
        
        // Exemplo de método
        Console.WriteLine(Saudacao("Desenvolvedor"));
        
        // Exemplo com arrays e LINQ
        int[] numeros = {1, 2, 3, 4, 5};
        var pares = numeros.Where(n => n % 2 == 0);
        Console.WriteLine("Números pares: " + string.Join(" ", pares));
    }
    
    static string Saudacao(string nome) 
    {
        return $"Olá, {nome}! 👋";
    }
}`,

  go: `// Bem-vindo ao Editor de Código Go
package main

import "fmt"

func saudacao(nome string) string {
    return fmt.Sprintf("Olá, %s! 👋", nome)
}

func main() {
    fmt.Println("🚀 Hello, World!")
    
    // Exemplo de função
    fmt.Println(saudacao("Desenvolvedor"))
    
    // Exemplo com slices
    numeros := []int{1, 2, 3, 4, 5}
    fmt.Print("Números pares: ")
    for _, num := range numeros {
        if num%2 == 0 {
            fmt.Printf("%d ", num)
        }
    }
    fmt.Println()
}`,

  rust: `// Bem-vindo ao Editor de Código Rust
fn saudacao(nome: &str) -> String {
    format!("Olá, {}! 👋", nome)
}

fn main() {
    println!("🚀 Hello, World!");
    
    // Exemplo de função
    println!("{}", saudacao("Desenvolvedor"));
    
    // Exemplo com vetores
    let numeros = vec![1, 2, 3, 4, 5];
    print!("Números pares: ");
    for num in &numeros {
        if num % 2 == 0 {
            print!("{} ", num);
        }
    }
    println!();
}`,

  php: `<?php
// Bem-vindo ao Editor de Código PHP
echo "🚀 Hello, World!\\n";

// Exemplo de função
function saudacao($nome) {
    return "Olá, $nome! 👋";
}

echo saudacao("Desenvolvedor") . "\\n";

// Exemplo com arrays
$numeros = [1, 2, 3, 4, 5];
$pares = array_filter($numeros, function($n) { return $n % 2 === 0; });
echo "Números pares: " . implode(" ", $pares) . "\\n";
?>`,

  ruby: `# Bem-vindo ao Editor de Código Ruby
puts "🚀 Hello, World!"

# Exemplo de método
def saudacao(nome)
  "Olá, #{nome}! 👋"
end

puts saudacao("Desenvolvedor")

# Exemplo com arrays
numeros = [1, 2, 3, 4, 5]
pares = numeros.select { |n| n.even? }
puts "Números pares: #{pares.join(' ')}"`,

  typescript: `// Bem-vindo ao Editor de Código TypeScript
console.log("🚀 Hello, World!");

// Exemplo de função tipada
function saudacao(nome: string): string {
  return \`Olá, \${nome}! 👋\`;
}

console.log(saudacao("Desenvolvedor"));

// Exemplo com arrays tipados
const numeros: number[] = [1, 2, 3, 4, 5];
const pares: number[] = numeros.filter((n: number) => n % 2 === 0);
console.log("Números pares:", pares);`,

  kotlin: `// Bem-vindo ao Editor de Código Kotlin
fun saudacao(nome: String): String {
    return "Olá, \$nome! 👋"
}

fun main() {
    println("🚀 Hello, World!")
    
    // Exemplo de função
    println(saudacao("Desenvolvedor"))
    
    // Exemplo com listas
    val numeros = listOf(1, 2, 3, 4, 5)
    val pares = numeros.filter { it % 2 == 0 }
    println("Números pares: \${pares.joinToString(" ")}")
}`,
  
  html: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Minha Página</title>
</head>
<body>
    <h1>🚀 Hello, World!</h1>
    <p>Bem-vindo ao editor de código!</p>
</body>
</html>`,
  
  css: `/* Bem-vindo ao Editor de CSS */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`
};

const SUPPORTED_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', extension: 'js', executable: true, monacoLang: 'javascript' },
  { id: 'python', name: 'Python', extension: 'py', executable: true, monacoLang: 'python' },
  { id: 'java', name: 'Java', extension: 'java', executable: true, monacoLang: 'java' },
  // { id: 'cpp', name: 'C++', extension: 'cpp', executable: true, monacoLang: 'cpp' },
  // { id: 'c', name: 'C', extension: 'c', executable: true, monacoLang: 'c' },
  // { id: 'csharp', name: 'C#', extension: 'cs', executable: true, monacoLang: 'csharp' },
  // { id: 'go', name: 'Go', extension: 'go', executable: true, monacoLang: 'go' },
  // { id: 'rust', name: 'Rust', extension: 'rs', executable: true, monacoLang: 'rust' },
  // { id: 'php', name: 'PHP', extension: 'php', executable: true, monacoLang: 'php' },
  // { id: 'ruby', name: 'Ruby', extension: 'rb', executable: true, monacoLang: 'ruby' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts', executable: true, monacoLang: 'typescript' },
  // { id: 'kotlin', name: 'Kotlin', extension: 'kt', executable: true, monacoLang: 'kotlin' },
  // { id: 'html', name: 'HTML', extension: 'html', executable: false, monacoLang: 'html' },
  // { id: 'css', name: 'CSS', extension: 'css', executable: false, monacoLang: 'css' }
];

interface CodeEditorPageProps {
  className?: string;
}

export const CodeEditorPage: React.FC<CodeEditorPageProps> = ({ className }) => {
  const navigate = useNavigate();
  
  const { 
    markAsExecuted, 
    examples,
    searchQuery, 
    setSearchQuery, 
    selectedLanguage, 
    setSelectedLanguage
  } = useExamples();
  
  const {
    isSimpleMode,
    isAdvancedMode,
    editorTheme,
    editorPreferences,
    toggleMode,
    isSyncingPreferences
  } = useCodeEditor();

  // Computed properties para filtragem
  const availableLanguages = useMemo(() => {
    const uniqueLanguages = new Set(examples.map(example => example.language));
    return Array.from(uniqueLanguages);
  }, [examples]);

  const filteredExamples = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return examples.filter(example => {
      const matchesLanguage = selectedLanguage === 'all' || example.language === selectedLanguage;
      if (!matchesLanguage) return false;

      if (!query) return true;

      const matchesTitle = example.title.toLowerCase().includes(query);
      const matchesLanguageName = example.language.toLowerCase().includes(query);
      const matchesTags = example.tags?.some(tag => tag.toLowerCase().includes(query));

      return matchesTitle || matchesLanguageName || matchesTags;
    });
  }, [examples, selectedLanguage, searchQuery]);
  
  // Persistência de código
  const {
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    saveCode,
    triggerAutoSave,
  } = useCodePersistence({
    autoSave: true,
    autoSaveDelay: 3000,
    onSaveSuccess: () => {
      console.log('Código salvo automaticamente');
    },
    onSaveError: (error) => {
      console.error('Erro ao salvar código:', error);
    },
  });
  
  const [currentCode, setCurrentCode] = useState(LANGUAGE_TEMPLATES.javascript);
  const [currentLanguage, setCurrentLanguage] = useState('javascript');
  const previousLanguageRef = React.useRef('javascript'); // Para reverter se cancelar
  const [theme, setTheme] = useState<'light' | 'dark'>(editorTheme || 'dark');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [showOutput, setShowOutput] = useState(false);
  const [showExamples, setShowExamples] = useState(true);
  const [fileName, setFileName] = useState('untitled');
  const [currentExampleId, setCurrentExampleId] = useState<string | null>(null);

  // Mission Tracker - Rastreamento automático de progresso das missões
  // Passa undefined para permitir que o hook busque missões de todas as turmas do usuário
  const { trackCodeExecution } = useMissionTracker(undefined);

  // Sync theme with context
  React.useEffect(() => {
    setTheme(editorTheme);
  }, [editorTheme]);

  const handleLanguageChange = useCallback((language: string) => {
    console.log('🔄 [handleLanguageChange] Tentando trocar de', currentLanguage, 'para', language);
    
    const currentTemplate = LANGUAGE_TEMPLATES[currentLanguage as keyof typeof LANGUAGE_TEMPLATES];
    const hasUnsavedChanges = currentCode !== currentTemplate;
    
    console.log('🔄 [handleLanguageChange] Código atual:', currentCode.substring(0, 50));
    console.log('🔄 [handleLanguageChange] Template esperado:', currentTemplate?.substring(0, 50));
    console.log('🔄 [handleLanguageChange] Tem alterações?', hasUnsavedChanges);
    
    // Se houver código diferente do template, perguntar ao usuário
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        `Você tem alterações não salvas em ${currentLanguage.toUpperCase()}.\n\n` +
        `Ao trocar para ${language.toUpperCase()}, seu código atual será perdido.\n\n` +
        `Deseja continuar?`
      );
      
      if (!confirmed) {
        console.log('❌ [handleLanguageChange] Usuário CANCELOU a troca!');
        // Forçar o Select a voltar para o valor anterior
        // Pequeno delay para garantir que o componente processe
        setTimeout(() => {
          setCurrentLanguage(previousLanguageRef.current);
        }, 0);
        return;
      }
    }
    
    // Trocar linguagem e carregar template
    console.log('✅ [handleLanguageChange] Trocando para', language);
    previousLanguageRef.current = language; // Salvar novo valor
    setCurrentLanguage(language);
    const template = LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES];
    if (template) {
      setCurrentCode(template);
      setCurrentExampleId(null); // Reset example tracking
      toast.success(`Linguagem alterada para ${language.toUpperCase()}`);
    }
    
    // Atualizar nome do arquivo
    const langConfig = SUPPORTED_LANGUAGES.find(l => l.id === language);
    if (langConfig) {
      setFileName(`untitled.${langConfig.extension}`);
    }
  }, [currentLanguage, currentCode]);

  const handleCodeChange = useCallback((code: string) => {
    setCurrentCode(code);
    // Trigger auto-save
    triggerAutoSave(code, currentLanguage, fileName);
  }, [currentLanguage, fileName, triggerAutoSave]);

  const handleRunCode = useCallback(async (code: string) => {
    setIsRunning(true);
    setShowOutput(true);
    
    const startTime = Date.now();
    
    // 🔴 DEBUG: Verificar se o código e linguagem batem
    console.log('🐛 [DEBUG] =====================');
    console.log('🐛 [DEBUG] Linguagem selecionada:', currentLanguage);
    console.log('🐛 [DEBUG] Código (primeiras 200 chars):', code.substring(0, 200));
    console.log('🐛 [DEBUG] =====================');
    
    // 🔴 VERIFICAÇÃO: Se selecionou Python mas está tentando executar JavaScript
    if (currentLanguage === 'python' && (code.includes('console.log') || code.includes('function ') || code.includes('=>'))) {
      const errorMsg = `⚠️ ERRO DE LINGUAGEM DETECTADO!\n\n` +
        `Você selecionou PYTHON no dropdown, mas o código no editor é JAVASCRIPT!\n\n` +
        `O código contém sintaxe JavaScript (console.log, function, =>)\n\n` +
        `Por favor:\n` +
        `1. Troque para JavaScript no dropdown superior, OU\n` +
        `2. Escreva código Python válido\n\n` +
        `Código detectado como JavaScript não será executado como Python!`;
      
      setOutput(errorMsg);
      toast.error('Incompatibilidade: Linguagem selecionada ≠ Código');
      setIsRunning(false);
      return;
    }
    
    try {
      if (currentLanguage === 'javascript') {
        const executionResult = await executeJavaScriptSafely(code, 5000) as any;
        const executionTime = Date.now() - startTime;
        
        // Montar saída formatada
        let output = '';
        
        if (executionResult.logs.length > 0) {
          output += '[Console Output]\n' + executionResult.logs.join('\n') + '\n\n';
        }
        
        if (executionResult.errors.length > 0) {
          output += '[Console Errors]\n' + executionResult.errors.join('\n') + '\n\n';
        }
        
        if (executionResult.executionError) {
          output += `[Execution Error]\n${executionResult.executionError.name}: ${executionResult.executionError.message}`;
          if (executionResult.executionError.stack) {
            // Limpar stack trace para mostrar apenas linhas relevantes
            const stack = executionResult.executionError.stack
              .split('\n')
              .filter(line => !line.includes('eval') && !line.includes('executeJavaScriptSafely'))
              .slice(0, 3)
              .join('\n');
            if (stack.trim()) {
              output += `\n\n[Stack Trace]\n${stack}`;
            }
          }
        } else {
          if (executionResult.result !== undefined) {
            const resultStr = typeof executionResult.result === 'object' 
              ? JSON.stringify(executionResult.result, null, 2) 
              : String(executionResult.result);
            output += `[Return Value]\n${resultStr}`;
          }
          
          if (executionResult.logs.length === 0 && executionResult.result === undefined) {
            output += '[Execution Completed]\nCódigo executado com sucesso! (Sem saída)';
          }
        }
        
        setOutput(output || '[Success] Código executado com sucesso!');
        
        // Rastrear execução de código para progresso da missão
        if (!executionResult.executionError) {
          console.log('[CodeEditorPage] 🚀 Executando trackCodeExecution...', {
            language: currentLanguage,
            codeLength: code.length,
            hasError: executionResult.executionError
          });
          await trackCodeExecution(currentLanguage, code.length);
          console.log('[CodeEditorPage] ✅ trackCodeExecution concluído');
        } else {
          console.log('[CodeEditorPage] ❌ Não rastreando: código com erro');
        }
        
        // Marcar exemplo como executado se estivermos executando um exemplo
        if (currentExampleId) {
          markAsExecuted(
            currentExampleId, 
            executionResult.executionError ? 'error' : 'success',
            output,
            executionTime
          );
        }
        
        if (executionResult.executionError) {
          toast.error('Erro durante execução');
        } else {
          toast.success('JavaScript executado no navegador!');
        }
      } else {
        // Para outras linguagens executáveis, usar Piston
        const currentLangConfig = SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage);
        
        if (currentLangConfig?.executable) {
          try {
            const pistonResult = await executeCodeViaPiston(currentLanguage, code);
            const executionTime = Date.now() - startTime;
            
            let output = '';
            let hasError = false;
            
            // Verificar se houve erro de compilação
            if (pistonResult.compile_output && pistonResult.compile_output.trim()) {
              output += `[Compile Output]\n${pistonResult.compile_output}\n\n`;
              if (pistonResult.status?.id !== 3) { // Status 3 = Accepted
                hasError = true;
              }
            }
            
            // Saída padrão
            if (pistonResult.stdout && pistonResult.stdout.trim()) {
              output += `[Output]\n${pistonResult.stdout}\n\n`;
            }
            
            // Erros de runtime
            if (pistonResult.stderr && pistonResult.stderr.trim()) {
              output += `[Runtime Error]\n${pistonResult.stderr}\n\n`;
              hasError = true;
            }
            
            // Status da execução
            if (pistonResult.status) {
              const statusDescription = pistonResult.status.description || 'Unknown';
              const statusPrefix = pistonResult.status.id === 3 ? '[Success]' : '[Error]';
              output += `${statusPrefix} ${statusDescription}`;
              
              if (pistonResult.time) {
                output += ` (${pistonResult.time}s)`;
              }
              if (pistonResult.memory) {
                output += ` [${pistonResult.memory}KB]`;
              }
            }
            
            if (!output.trim()) {
              output = hasError ? '[Error] Execução falhou sem output' : '[Success] Código executado com sucesso! (Sem saída)';
            }
            
            setOutput(output);
            
            // Marcar exemplo como executado se estivermos executando um exemplo
            if (currentExampleId) {
              markAsExecuted(
                currentExampleId, 
                hasError ? 'error' : 'success',
                output,
                executionTime
              );
            }
            
            if (hasError) {
              toast.error(`Erro na execução ${currentLanguage.toUpperCase()}`);
            } else {
              toast.success(`${currentLanguage.toUpperCase()} executado com sucesso!`);
            }
            
          } catch (pistonError) {
            const errorMessage = pistonError instanceof Error ? pistonError.message : String(pistonError);
            setOutput(`[Error] Erro ao executar ${currentLanguage.toUpperCase()}:\n${errorMessage}\n\n[Warning] Verifique se o serviço Piston está disponível.`);
            toast.error(`Erro ao executar ${currentLanguage.toUpperCase()}`);
          }
        } else {
          // Para linguagens não executáveis (HTML, CSS)
          setOutput(`[Info] Código ${currentLanguage.toUpperCase()} validado!\n\n[Warning] Esta linguagem não suporta execução direta.\nUse um navegador web ou ferramenta apropriada para visualizar o resultado.`);
          toast.success('Código validado!');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setOutput(`[Critical Error] Erro crítico na execução:\n${errorMessage}`);
      toast.error('Erro crítico ao executar código');
    } finally {
      setIsRunning(false);
    }
  }, [currentLanguage, currentExampleId, markAsExecuted]);

  const handleSaveFile = useCallback(async () => {
    // Salvar no banco de dados
    await saveCode(currentCode, currentLanguage, fileName);
    
    // Também fazer download local
    const element = document.createElement('a');
    const file = new Blob([currentCode], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [currentCode, fileName, currentLanguage, saveCode]);

  const handleLoadExample = useCallback((example: CodeExample) => {
    setCurrentCode(example.code);
    setCurrentLanguage(example.language);
    setCurrentExampleId(example.id);
    setFileName(`${example.title.toLowerCase().replace(/\s+/g, '_')}.${example.language === 'javascript' ? 'js' : example.language}`);
    // toast.success(`Exemplo "${example.title}" carregado!`);
  }, []);

  const handleReset = useCallback(() => {
    const template = LANGUAGE_TEMPLATES[currentLanguage as keyof typeof LANGUAGE_TEMPLATES];
    if (template) {
      setCurrentCode(template);
      setCurrentExampleId(null);
      toast.success('Código resetado!');
    }
  }, [currentLanguage]);

  return (
    <div className={cn('flex h-screen w-full bg-gradient-to-br from-background via-background to-purple-50/10 dark:to-purple-950/10 overflow-hidden', className)}>
      {/* Painel Principal - Editor */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Unified Header with Purple Educational Theme */}
        <div className="relative border-b flex-shrink-0 bg-gradient-to-r from-purple-500/10 via-purple-400/5 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
          
          <div className="relative px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              {/* Left: Logo and Breadcrumb */}
              <div className="flex items-center gap-4">
                <Link to="/home" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25">
                    <Code2 className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
                      CoderBot
                    </h1>
                    <p className="text-[10px] text-muted-foreground -mt-0.5">
                      Editor de Código
                    </p>
                  </div>
                </Link>
                
                <div className="h-6 w-px bg-border" />
                
                {/* Mode Toggle */}
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMode}
                  disabled={isSyncingPreferences}
                  className={cn(
                    "gap-2 transition-all duration-200",
                    isSimpleMode 
                      ? "border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/30" 
                      : "border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                  )}
                >
                  {isSimpleMode ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium">Modo Simples</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-medium">Modo Avançado</span>
                    </>
                  )}
                </Button> */}
              </div>
              
              {/* Right: Quick Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/profile?tab=preferences')}
                  className="h-8 w-8 p-0"
                  title="Preferências do Editor"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Language Selector */}
                <Select 
                  key={currentLanguage} 
                  value={currentLanguage} 
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-48 h-9 bg-background/80 backdrop-blur-sm border-purple-200/50 dark:border-purple-800/50 focus:border-purple-400 dark:focus:border-purple-600 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{lang.name}</span>
                          {lang.executable && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-800">
                              <Play className="w-3 h-3" />
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Execution Badge */}
                {currentLanguage === 'javascript' && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 dark:from-blue-900/30 dark:to-blue-950/20 dark:text-blue-200 border-blue-200/50 dark:border-blue-800/50">
                    <Shield className="w-3 h-3 mr-1" />
                    Navegador
                  </Badge>
                )}
                
                {currentLanguage !== 'javascript' && SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.executable && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 dark:from-purple-900/30 dark:to-purple-950/20 dark:text-purple-200 border-purple-200/50 dark:border-purple-800/50">
                    <Terminal className="w-3 h-3 mr-1" />
                    Piston
                  </Badge>
                )}
                
                {SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.executable === false && (
                  <Badge variant="secondary" className="bg-muted/70 text-muted-foreground border-border/50">
                    <FileText className="w-3 h-3 mr-1" />
                    Texto
                  </Badge>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Indicador de salvamento */}
                {isSaving && (
                  <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Salvando...
                  </Badge>
                )}
                
                {!isSaving && lastSaved && (
                  <Badge variant="secondary" className="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    <CheckCircle className="w-3 h-3" />
                    Salvo {new Date(lastSaved).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                )}
                
                {hasUnsavedChanges && !isSaving && (
                  <Badge variant="secondary" className="gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                    <AlertCircle className="w-3 h-3" />
                    Alterações não salvas
                  </Badge>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReset}
                  className="h-9 gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveFile}
                  disabled={isSaving}
                  className="h-9 gap-2"
                >
                  {isSaving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">{isSaving ? 'Salvando...' : 'Salvar'}</span>
                </Button>
                
                <Button 
                  size="sm" 
                  onClick={() => handleRunCode(currentCode)}
                  disabled={isRunning}
                  className={cn(
                    "h-9 gap-2 shadow-md transition-all duration-200",
                    currentLanguage === 'javascript' 
                      ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30' 
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30'
                  )}
                >
                  <Play className="w-3.5 h-3.5" />
                  {isRunning ? 'Executando...' : 
                   currentLanguage === 'javascript' ? 'Executar' : 'Executar'
                  }
                  {currentLanguage === 'javascript' && (
                    <Shield className="w-3 h-3 ml-1" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Área de trabalho */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Editor */}
          <div className={`flex-1 flex flex-col min-h-0 ${showOutput ? 'w-2/3' : 'w-full'}`}>
            <div className="flex-1 min-h-0 overflow-hidden">
              <CodeEditor
                initialCode={currentCode}
                language={SUPPORTED_LANGUAGES.find(l => l.id === currentLanguage)?.monacoLang || currentLanguage}
                theme={theme}
                onCodeChange={handleCodeChange}
                onRun={handleRunCode}
                height="100%"
                showActions={false}
                enableLinting={isAdvancedMode}
                enableLSP={editorPreferences.enable_lsp}
                fontSize={editorPreferences.font_size}
                showMinimap={editorPreferences.show_minimap}
                showLineNumbers={editorPreferences.show_line_numbers}
                enableLigatures={editorPreferences.enable_ligatures}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Output Terminal */}
          {showOutput && (
            <div className="w-1/3 border-l flex flex-col min-h-0">
              <div className="px-3 py-2 border-b bg-muted/50 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span className="font-medium text-sm">Saída</span>
                  {currentLanguage === 'javascript' && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200 text-xs">
                      <Shield className="w-2.5 h-2.5 mr-1" />
                      Navegador
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setOutput('')}
                    className="h-6 px-2 text-xs"
                    title="Limpar saída"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowOutput(false)}
                    className="h-6 w-6 p-0"
                  >
                    ✕
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-3 min-h-0">
                <pre className="text-sm font-mono whitespace-pre-wrap">
                  {output || 'Nenhuma saída ainda...'}
                </pre>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>

      {/* Painel de Exemplos */}
      {showExamples && (
        <aside className="relative flex h-full w-[22rem] flex-col border-l bg-background/95 supports-[backdrop-filter]:backdrop-blur-xl min-h-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-muted/40" aria-hidden="true" />

          <div className="relative border-b border-border/60 px-4 py-4 flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent" aria-hidden="true" />
            <div className="relative flex items-start justify-between gap-4">
              {/* <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-inner shadow-primary/10">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.32em] text-muted-foreground/80">
                    Biblioteca
                  </p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold leading-tight text-foreground">
                      Exemplos de Código
                    </h3>
                    <Badge variant="secondary" className="rounded-full px-2 py-0 text-[11px] font-medium">
                      {filteredExamples.length} ativos
                    </Badge>
                  dasdad</div>
                  <p className="text-xs text-muted-foreground">
                    Inspirações prontas para usar no editor
                  </p>
                </div>
              </div> */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowExamples(false)}
                className="h-8 w-8 rounded-full text-muted-foreground transition hover:bg-primary/10 hover:text-primary"
              >
                <span className="sr-only">Fechar painel de exemplos</span>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* <div className="relative mt-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Buscar por título, linguagem ou tag..."
                className="h-9 rounded-lg border border-border/70 bg-background/80 pl-9 text-sm placeholder:text-muted-foreground/70"
              />
            </div> */}

            {availableLanguages.length > 1 && (
              <div className="relative mt-3 flex flex-wrap gap-2">
                {['all', ...availableLanguages].map((language) => {
                  const isActive = selectedLanguage === language;
                  return (
                    <Button
                      key={language}
                      type="button"
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="edu-xs"
                      className={cn(
                        'rounded-full border border-transparent px-3 text-xs font-medium transition',
                        isActive
                          ? 'border-primary/40 bg-primary/15 text-primary shadow-sm'
                          : 'border-border/50 bg-background/60 text-muted-foreground hover:border-primary/20 hover:bg-primary/10 hover:text-primary'
                      )}
                      onClick={() => setSelectedLanguage(language)}
                    >
                      {language === 'all' ? 'Todas' : language.toUpperCase()}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="relative flex-1 overflow-hidden min-h-0">
            <ExamplesPanel
              className="h-full bg-transparent"
              onExampleSelect={handleLoadExample}
              theme={theme}
            />
          </div>
        </aside>
      )}

      {/* Botão para mostrar exemplos quando oculto */}
      {!showExamples && (
        <div className="fixed bottom-4 right-4">
          <Button onClick={() => setShowExamples(true)} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Mostrar Exemplos
          </Button>
        </div>
      )}
    </div>
  );
};

export default CodeEditorPage;
