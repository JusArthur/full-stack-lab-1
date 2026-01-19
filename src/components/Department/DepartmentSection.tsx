import type { Department } from '../../types/types';

interface Props {
    dept: Department;
}

const DepartmentSection = ({ dept }: Props) => {
    return (
        <section className="department">
            <h2>{dept.name}</h2>
            <ul>
                {dept.employees.map((emp, index) => (
                    <li key={index}>
                        {emp.firstName} {emp.lastName || ''}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default DepartmentSection;