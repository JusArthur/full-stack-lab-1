import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'; // <-- Import Clerk here
import { Page } from '../components/layout/Page';
import AddRoleForm from '../components/Organization/AddRoleForm';
import { organizationService } from '../services/OrganizationService';
import type { Role } from '../types/types';

const OrganizationPage = () => {
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        refreshRoles();
    }, []);

    const refreshRoles = async () => {
        const data = await organizationService.getRoles();
        setRoles(data);
    };

    return (
        <Page>
            <h2 className="organization-title">Leadership & Management</h2>
            <div className="organization-grid">
                {roles.map((role, index) => (
                    <div className="organization-card" key={index}>
                        <div className="role-name">{role.firstName} {role.lastName}</div>
                        <div className="role-title">{role.title}</div>
                    </div>
                ))}
            </div>
            
            {/* 1. Only show the form if signed in */}
            <SignedIn>
                <AddRoleForm onRoleAdded={refreshRoles} />
            </SignedIn>

            {/* 2. Show the nice custom login box if signed out */}
            <SignedOut>
                <div style={{ 
                    border: '1px dashed #ccc', 
                    padding: '40px', 
                    textAlign: 'center', 
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    marginTop: '20px'
                }}>
                    <h3 style={{ margin: '0 0 10px 0', color: '#555' }}>🔒 Restricted Area</h3>
                    <p style={{ color: '#777', marginBottom: '20px' }}>
                        You must be logged in to create new leadership roles.
                    </p>
                    <SignInButton mode="modal">
                        <button style={{
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            padding: '10px 20px', 
                            borderRadius: '6px', 
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}>
                            Log in to add a role
                        </button>
                    </SignInButton>
                </div>
            </SignedOut>
        </Page>
    );
};

export default OrganizationPage;