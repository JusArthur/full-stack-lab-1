import { useState } from 'react';
import { Page } from '../components/layout/Page';
import AddRoleForm from '../hooks/AddRoleForm';
import { organizationService } from '../services/OrganizationService';
import type { Role } from '../types/types';

const OrganizationPage = () => {
    const [roles, setRoles] = useState<Role[]>(organizationService.getRoles());

    const refreshRoles = () => {
        setRoles(organizationService.getRoles());
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

            <AddRoleForm onRoleAdded={refreshRoles} />
        </Page>
    );
};

export default OrganizationPage;