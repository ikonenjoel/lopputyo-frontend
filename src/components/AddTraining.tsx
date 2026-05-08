import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface AddTrainingProps {
  customerHref: string;
  saveTraining: (training: any) => void;
}

export default function AddTraining({
  customerHref,
  saveTraining,
}: AddTrainingProps) {
  const [open, setOpen] = useState(false);

  const [training, setTraining] = useState({
    date: dayjs(),
    activity: "",
    duration: "",
    customer: customerHref,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    // muutetaan ISO muotoon jotta se toimisi API:n kanssa
    const newTraining = {
      ...training,
      date: training.date.toISOString(),
      duration: Number(training.duration),
    };

    saveTraining(newTraining);
    handleClose();

    // Tyhjennetään lomake
    setTraining({
      date: dayjs(),
      activity: "",
      duration: "",
      customer: customerHref,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button
        size="small"
        variant="outlined"
        onClick={handleClickOpen}
        // style={{ width: "180px" }} yritys korjata napin overflow.
      >
        Lisää harjoitus
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Uusi harjoitus asiakkaalle</DialogTitle>
        <DialogContent>
          <DateTimePicker
            label="Päivämäärä ja aika"
            value={training.date}
            onChange={(newValue) =>
              setTraining({ ...training, date: newValue || dayjs() })
            }
            sx={{ width: "100%", mt: 2, mb: 1 }}
          />
          <TextField
            margin="dense"
            label="Aktiviteetti"
            fullWidth
            value={training.activity}
            onChange={(e) =>
              setTraining({ ...training, activity: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Kesto (min)"
            type="number"
            fullWidth
            value={training.duration}
            onChange={(e) =>
              setTraining({ ...training, duration: e.target.value })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Peruuta</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Tallenna
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
