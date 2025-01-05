import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface AddTaskButtonProps {
  onClick: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onClick }) => (
  <Fab color="primary" aria-label="add" onClick={onClick}>
    <AddIcon />
  </Fab>
);

export default AddTaskButton;