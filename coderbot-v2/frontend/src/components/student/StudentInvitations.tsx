import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import { pb } from '@/integrations/pocketbase/client';
import { toast } from '@/components/ui/use-toast';

interface Invitation {
  id: string;
  classId: string;
  className: string;
  teacherName: string;
  date: string;
}

export const StudentInvitations: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Buscar convites do estudante
  useEffect(() => {
    const fetchInvitations = async () => {
      setIsLoading(true);
      try {
        const currentUser = pb.authStore.model;
        if (!currentUser) {
          throw new Error('Usuário não autenticado');
        }

        // Buscar convites pendentes para o email do usuário
        const invitationsResponse = await pb.collection('invitations').getList(1, 50, {
          filter: `email = "${currentUser.email}" && status = "pending"`,
          sort: '-created',
          expand: 'class,createdBy'
        });

        const mappedInvitations = invitationsResponse.items.map(item => ({
          id: item.id,
          classId: item.class,
          className: item.expand?.class?.name || 'Turma',
          teacherName: item.expand?.createdBy?.name || 'Professor',
          date: new Date(item.created).toLocaleDateString()
        }));
        setInvitations(mappedInvitations);
      } catch (error) {
        console.error('Erro ao buscar convites:', error);
        toast({
          title: 'Erro ao carregar convites',
          description: 'Não foi possível carregar seus convites.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  // Função para aceitar convite
  const handleAcceptInvitation = async (invitationId: string, classId: string) => {
    try {
      // Primeiro atualiza o status do convite para 'accepted'
      await pb.collection('invitations').update(invitationId, {
        status: 'accepted'
      });

      // Depois cria uma inscrição do aluno na turma
      await pb.collection('class_enrollments').create({
        class: classId,
        student: pb.authStore.model?.id
      });

      // Atualiza o estado local
      setInvitations(prev => prev.filter(invitation => invitation.id !== invitationId));

      toast({
        title: 'Convite aceito',
        description: 'Você agora é membro da turma!',
        variant: 'default'
      });
    } catch (error) {
      console.error('Erro ao aceitar convite:', error);
      toast({
        title: 'Erro ao aceitar convite',
        description: 'Não foi possível aceitar o convite.',
        variant: 'destructive'
      });
    }
  };

  // Função para recusar convite
  const handleRejectInvitation = async (invitationId: string) => {
    try {
      await pb.collection('invitations').update(invitationId, {
        status: 'rejected'
      });

      setInvitations(prev => prev.filter(invitation => invitation.id !== invitationId));

      toast({
        title: 'Convite recusado',
        description: 'O convite foi recusado com sucesso.',
        variant: 'default'
      });
    } catch (error) {
      console.error('Erro ao recusar convite:', error);
      toast({
        title: 'Erro ao recusar convite',
        description: 'Não foi possível recusar o convite.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-20">
        <p>Carregando convites...</p>
      </div>
    );
  }

  if (invitations.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">Você não possui convites pendentes.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Convites para Turmas</CardTitle>
        <CardDescription>
          Convites pendentes de professores para participar de turmas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Lista de convites pendentes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Turma</TableHead>
              <TableHead>Professor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitations.map((invitation) => (
              <TableRow key={invitation.id}>
                <TableCell className="font-medium">{invitation.className}</TableCell>
                <TableCell>{invitation.teacherName}</TableCell>
                <TableCell>{invitation.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleAcceptInvitation(invitation.id, invitation.classId)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Aceitar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRejectInvitation(invitation.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" /> Recusar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default StudentInvitations; 