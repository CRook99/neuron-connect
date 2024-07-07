import { ReactNode, createContext, useContext, useState } from 'react';
import { Graph } from '../classes/graph';

interface GraphProviderProps {
    children: ReactNode;
    rows: number;
    cols: number;
}

const GraphContext = createContext<Graph | null>(null);

export const useGraphContext = (): Graph => {
    const context = useContext(GraphContext);
    if (context === null) {
        throw new Error('useGraph used outside of GraphProvider');
    }
    return context;
};

export const GraphProvider: React.FC<GraphProviderProps> = ({children, rows, cols}) => {
    const [graph] = useState(() => new Graph(rows, cols));

    return (
        <GraphContext.Provider value={graph}>
            {children}
        </GraphContext.Provider>
    );
};