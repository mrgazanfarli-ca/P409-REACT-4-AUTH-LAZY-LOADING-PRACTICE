import React from 'react';
import { Container } from 'reactstrap';

export const AuthPageContainer: React.FC = ({ children }) => {
    return (
        <Container style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </Container>
    )
}
