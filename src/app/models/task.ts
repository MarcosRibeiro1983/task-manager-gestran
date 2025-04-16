export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pendente' | 'em_desenvolvimento' | 'concluida';
    responsible: string;
    dueDate: string;
  }