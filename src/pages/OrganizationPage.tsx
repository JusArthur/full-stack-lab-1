import { useState } from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Page } from '../components/layout/Page';
import AddRoleForm from '../components/Organization/AddRoleForm';
import { organizationService } from '../services/OrganizationService';

const OrganizationPage = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const limit = 3; // Number of roles (not employees) per page

    const { data: paginatedData, isLoading, isError } = useQuery({
        queryKey: ['roles', page],
        queryFn: () => organizationService.getRoles(page, limit),
        staleTime: 10000,
    });

    const handleRoleAdded = () => {
        queryClient.invalidateQueries({ queryKey: ['roles'] });
    };

    if (isLoading) {
        return (
            <Page>
                <div style={{ textAlign: "center", padding: "40px" }}>Loading leadership data...</div>
            </Page>
        );
    }

    if (isError) {
        return (
            <Page>
                <div style={{ textAlign: "center", padding: "40px", color: "red" }}>Error loading records.</div>
            </Page>
        );
    }

    const roles = paginatedData?.data || [];
    const meta = paginatedData?.meta;

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

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', margin: '30px 0' }}>
                    <button 
                        disabled={page === 1} 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        style={{ padding: "8px 16px", cursor: page === 1 ? "not-allowed" : "pointer" }}
                    >
                        Previous
                    </button>
                    
                    <span style={{ fontWeight: "bold" }}>
                        Page {meta.currentPage} of {meta.totalPages}
                    </span>
                    
                    <button 
                        disabled={page === meta.totalPages} 
                        onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                        style={{ padding: "8px 16px", cursor: page === meta.totalPages ? "not-allowed" : "pointer" }}
                    >
                        Next
                    </button>
                </div>
            )}
            
            <SignedIn>
                <AddRoleForm onRoleAdded={handleRoleAdded} />
            </SignedIn>

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