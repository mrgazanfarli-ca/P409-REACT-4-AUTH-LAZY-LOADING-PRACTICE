import React from 'react';
import { AppContext } from '../context';

export const NameDisplay: React.FC = () => {
    const name = React.useContext(AppContext);

    return <p>{name}</p>
}
