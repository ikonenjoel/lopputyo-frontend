import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { type Customer } from "./CustomerList";

interface AddCustomerProps {
  saveCustomer: (customer: Customer) => void;
}

export default function AddCustomer({ saveCustomer }: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    firstname: "",
    lastname: "",
    email: "",
    streetaddress: "",
    phone: "",
    postcode: "",
    city: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCustomer = () => {
    saveCustomer(customer);
    handleClose();
    // Tyhjentää lomakkeen lisäyksen jälkeen
    setCustomer({
      firstname: "",
      lastname: "",
      email: "",
      streetaddress: "",
      phone: "",
      postcode: "",
      city: "",
    });
  };

  return (
    <div style={{ margin: "10px" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Uusi asiakas
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi asiakas</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Etunimi"
            fullWidth
            value={customer.firstname}
            onChange={(e) =>
              setCustomer({ ...customer, firstname: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Sukunimi"
            fullWidth
            value={customer.lastname}
            onChange={(e) =>
              setCustomer({ ...customer, lastname: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Sähköposti"
            fullWidth
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Puhelin"
            fullWidth
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Osoite"
            fullWidth
            value={customer.streetaddress}
            onChange={(e) =>
              setCustomer({ ...customer, streetaddress: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Postinumero"
            fullWidth
            value={customer.postcode}
            onChange={(e) =>
              setCustomer({ ...customer, postcode: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Kaupunki"
            fullWidth
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={addCustomer}>Tallenna</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
