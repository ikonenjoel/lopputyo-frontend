import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import type {
  ColDef,
  ValueFormatterParams,
  ValueGetterParams,
} from "ag-grid-community";
import dayjs from "dayjs";
import { type Customer } from "./CustomerList";

interface Training {
  date: string;
  duration: number;
  activity: string;
  _links: {
    self: { href: string };
    customer: { href: string };
  };
  customer?: Customer;
}

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      // hakee harjoitukset
      const response = await fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings",
      );
      const data = await response.json();
      const trainingsData: Training[] = data._embedded.trainings;

      // käy harjoitukset läpi ja hakee asiakkaan
      const trainingsWithCustomers = await Promise.all(
        trainingsData.map(async (training) => {
          try {
            // hakee asiakkaan _links.customer.href osotteesta
            const customerResponse = await fetch(training._links.customer.href);
            const customerData: Customer = await customerResponse.json();

            // muutetaan olioksi ja lisätään asiakas
            return {
              ...training,
              customer: customerData,
            };
          } catch (error) {
            console.error("Virhe haettaessa asiakasta", error);
            return training;
          }
        }),
      );

      setTrainings(trainingsWithCustomers);
    } catch (err) {
      console.error("Virhe haettaessa harjotuksia ", err);
    }
  };

  const [columnDefs] = useState<ColDef<Training>[]>([
    {
      field: "date",
      headerName: "Päivämäärä",
      sortable: true,
      filter: true,
      valueFormatter: (params: ValueFormatterParams<Training, string>) => {
        return params.value
          ? dayjs(params.value).format("DD.MM.YYYY HH:mm")
          : "";
      },
    },
    {
      field: "duration",
      headerName: "Kesto (min)",
      sortable: true,
      filter: true,
    },
    {
      field: "activity",
      headerName: "Aktiviteetti",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Asiakas",

      valueGetter: (params: ValueGetterParams<Training>) => {
        if (
          params.data &&
          params.data.customer &&
          params.data.customer.firstname
        ) {
          return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
        }
        return "Ei asiakasta";
      },
      sortable: true,
      filter: true,
    },
  ]);

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "90%", margin: "auto" }}
    >
      <h2>Harjoitukset</h2>
      <AgGridReact<Training>
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
        theme="legacy"
      />
    </div>
  );
}
