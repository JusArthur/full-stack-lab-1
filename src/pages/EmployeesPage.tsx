import { useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Page } from "../components/layout/Page";
import DepartmentSection from "../components/Department/DepartmentSection";
import AddEmployeeForm from "../components/Employee/AddEmployeeForm";
import { employeeService } from "../services/EmployeeService";

const EmployeesPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 3; // Number of departments to show per page

  // 1. Fetch Data using React Query
  const { data: paginatedData, isLoading, isError } = useQuery({
    queryKey: ['departments', page], // Query key tracks the page number for caching
    queryFn: () => employeeService.getDepartments(page, limit),
    staleTime: 10000, // Data stays fresh for 10 seconds before refetching in background
  });

  // 2. Invalidate cache on modification
  const handleEmployeeAdded = () => {
    // This immediately triggers a background refetch to show the new data
    queryClient.invalidateQueries({ queryKey: ['departments'] });
  };

  if (isLoading) {
    return (
      <Page>
        <div style={{ textAlign: "center", padding: "40px" }}>Loading records...</div>
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

  const departments = paginatedData?.data || [];
  const meta = paginatedData?.meta;

  return (
    <Page>
      {/* Map through paginated data */}
      {departments.map((dept, index) => (
        <DepartmentSection key={index} dept={dept} />
      ))}

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

      {/* Access Control & Forms */}
      <SignedIn>
        <AddEmployeeForm
          departments={departments} 
          onEmployeeAdded={handleEmployeeAdded}
        />
      </SignedIn>

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
    </Page>
  );
};

export default EmployeesPage;