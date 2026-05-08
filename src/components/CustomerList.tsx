import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { type ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";

// asiakkaan tyyppimäärittely
export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  city: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers",
    )
      .then((response) => response.json())
      .then((data) => setCustomers(data._embedded.customers))
      .catch((err) => console.error("Virhe haettaessa asiakkaita", err));
  };

  // uuden asiakkaan tallentaminen tietokantaan
  const saveCustomer = (newCustomer: Customer) => {
    fetch(
      "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      },
    )
      .then((res) => {
        if (res.ok) {
          fetchCustomers();
        } else {
          alert("Jokin meni pieleen");
        }
      })
      .catch((err) => console.error(err));
  };
  // tyypittää sarakemäärittelyn
  const [columnDefs] = useState<ColDef<Customer>[]>([
    { field: "firstname", headerName: "Etunimi", sortable: true, filter: true },
    { field: "lastname", headerName: "Sukunimi", sortable: true, filter: true },
    { field: "city", headerName: "Kaupunki", sortable: true, filter: true },
    { field: "email", headerName: "Sähköposti", sortable: true, filter: true },
    { field: "phone", headerName: "Puhelin", sortable: true, filter: true },
  ]);

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
      <h2>Asiakkaat</h2>

      <AddCustomer saveCustomer={saveCustomer} />

      <AgGridReact<Customer>
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
        theme="legacy" // korjaa valituksen konsolissa pakottamalla teeman
      />
    </div>
  );
}
