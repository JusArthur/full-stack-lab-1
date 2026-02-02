import { Page } from '../components/layout/Page';
import { organizationData } from '../data/organizationData';

const OrganizationPage = () => {
    return (
        <Page>
            <h2 style={{ color: '#2980b9', marginBottom: '1rem' }}>Leadership & Management</h2>
            <div className="organization-list" style={{ display: 'grid', gap: '10px' }}>
                {organizationData.map((role, index) => (
                    <div 
                        key={index} 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            padding: '15px', 
                            border: '1px solid #eee',
                            borderRadius: '4px',
                            backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff'
                        }}
                    >
                        <span style={{ fontWeight: 'bold' }}>{role.firstName} {role.lastName}</span>
                        <span style={{ color: '#555', fontStyle: 'italic' }}>{role.title}</span>
                    </div>
                ))}
            </div>
        </Page>
    );
};

export default OrganizationPage;