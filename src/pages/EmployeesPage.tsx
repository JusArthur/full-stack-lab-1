import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { Page } from "../components/layout/Page";
import DepartmentSection from "../components/Department/DepartmentSection";
import AddEmployeeForm from "../components/Employee/AddEmployeeForm";
import type { Department } from "../types/types";
import { employeeService } from "../services/EmployeeService";

const EmployeesPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    refreshDepartments();
  }, []);

  const refreshDepartments = async () => {
    const data = await employeeService.getDepartments();
    setDepartments(data);
  };

  return (
    <Page>
      {departments.map((dept, index) => (
        <DepartmentSection key={index} dept={dept} />
      ))}

      {departments.length > 0 && (
        <>
          {/* Only show the form if the user is Signed In */}
          <SignedIn>
            <AddEmployeeForm
              departments={departments}
              onEmployeeAdded={refreshDepartments}
            />
          </SignedIn>

          {/* Show a message if the user is Signed Out */}
          <SignedOut>
            <div
              style={{
                border: "1px dashed #ccc",
                padding: "40px",
                textAlign: "center",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                marginTop: "20px",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#555" }}>
                🔒 Restricted Area
              </h3>
              <p style={{ color: "#777", marginBottom: "20px" }}>
                You must be logged in to create new records.
              </p>
              <SignInButton mode="modal">
                <button
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Log in to get started
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </>
      )}
    </Page>
  );
};

export default EmployeesPage;
