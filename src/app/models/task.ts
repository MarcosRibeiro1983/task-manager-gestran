export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pendente' | 'em desenvolvimento' | 'concluida';
    responsible: string;
    dueDate: string;
  }