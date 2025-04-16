export enum TaskStatus {
    PENDING = 'PENDING',
    IN_DEVELOPMENT = 'IN_DEVELOPMENT',
    FINISHED = 'FINISHED',
}

export const TASK_STATUS_LIST = [
    { value: TaskStatus.PENDING, label: 'Pendente', summary: 'PENDENTE', cssClass: 'bg-warning' },
    { value: TaskStatus.IN_DEVELOPMENT, label: 'Em desenvolvimento', summary: 'EM DESENVOLVIMENTO', cssClass: 'bg-primary' }, 
    { value: TaskStatus.FINISHED, label: 'Finalizada', summary: 'FINALIZADO', cssClass: 'bg-success' },

];

export const TASK_STATUS_LIST_MAP = new Map();
TASK_STATUS_LIST.forEach( i => TASK_STATUS_LIST_MAP.set( i.value, { label: i.label, summary: i.summary, cssClass: i.cssClass} ) );
