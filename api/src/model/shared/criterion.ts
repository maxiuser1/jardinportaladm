export type Criterion = {
    filters: Filtro[];
    sortBy: string;
    sortDirection: string;
    limit: number;
    offset: number;
};

export type Filtro = {
    field: string;
    operator: string;
    value: string;
    type: string;
};
