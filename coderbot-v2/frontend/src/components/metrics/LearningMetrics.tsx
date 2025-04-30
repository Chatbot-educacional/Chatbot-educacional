
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dados simulados para as métricas - em uma aplicação real viriam do backend
const ACTIVITY_DATA = [
  { name: 'Seg', value: 4 },
  { name: 'Ter', value: 3 },
  { name: 'Qua', value: 5 },
  { name: 'Qui', value: 2 },
  { name: 'Sex', value: 6 },
  { name: 'Sáb', value: 3 },
  { name: 'Dom', value: 2 },
];

const LANGUAGE_DATA = [
  { name: 'Python', value: 45 },
  { name: 'JavaScript', value: 30 },
  { name: 'HTML/CSS', value: 15 },
  { name: 'SQL', value: 10 },
];

const COLORS = ['#9b87f5', '#7E69AB', '#D6BCFA', '#F1F0FB'];

const ProgressCard = ({ title, value, total, description }: { title: string; value: number; total: number; description: string }) => {
  const percentage = Math.round((value / total) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{value} de {total}</span>
            <span className="text-sm font-medium text-education-primary">{percentage}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-education-primary rounded-full" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const LearningMetrics = () => {
  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Seu progresso de aprendizagem</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ProgressCard 
            title="Desafios concluídos" 
            value={12} 
            total={30} 
            description="Desafios de programação concluídos"
          />
          <ProgressCard 
            title="Lições completadas" 
            value={24} 
            total={42} 
            description="Lições teóricas estudadas"
          />
          <ProgressCard 
            title="Projetos entregues" 
            value={3} 
            total={5} 
            description="Projetos práticos finalizados"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade diária</CardTitle>
            <CardDescription>
              Tempo dedicado aos estudos nos últimos 7 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickCount={6} />
                  <Tooltip 
                    formatter={(value) => [`${value} horas`, 'Tempo de estudo']}
                    labelStyle={{ color: '#1A1F2C' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem'
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#9b87f5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Linguagens estudadas</CardTitle>
            <CardDescription>
              Distribuição do tempo por linguagem de programação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={LANGUAGE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {LANGUAGE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Porcentagem de tempo']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '0.375rem'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Dicas para melhorar seu aprendizado</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Tente completar pelo menos um desafio de código todos os dias</li>
            <li>Revise conceitos importantes usando o recurso de chat</li>
            <li>Pratique escrevendo código do zero no playground</li>
            <li>Aplique os conceitos aprendidos em pequenos projetos pessoais</li>
            <li>Estabeleça uma rotina consistente de estudos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
