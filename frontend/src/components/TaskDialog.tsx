import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
} from "@mui/material";
import { Task } from "../types/ITask";
import "../style/DialogStyles.css";

interface TaskDialogProps {
  task: Task;
  users: { id: number; name: string }[];
  open: boolean;
  onSave: () => void;
  onCancel: () => void;
  onChange: (task: Task) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({ task, users, open, onSave, onCancel, onChange }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle className="dialog-title">{task.id ? "Edit Task" : "Add Task"}</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          fullWidth
          label="Description"
          value={task.description}
          onChange={(e) => onChange({ ...task, description: e.target.value })}
          margin="normal"
        />
        <Select
          fullWidth
          native
          value={task.priority || ""} 
          onChange={(e) =>
            onChange({ ...task, priority: e.target.value as "Low" | "Medium" | "High" })
          }
          className="select-field"
        >
          <option value="" disabled>Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </Select>
        <Select
          fullWidth
          native
          value={task.status || ""} 
          onChange={(e) =>
            onChange({ ...task, status: e.target.value as "Pending" | "In Progress" | "Completed" })
          }
          className="select-field"
        >
          <option value="" disabled>Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Select>
        <Select
          fullWidth
          native
          value={task.assignee}
          onChange={(e) =>
            onChange({ ...task, assignee: e.target.value })
          }
          className="select-field"
        >
          <option value="" disabled>Select Assignee</option>
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </Select>
        {task.id === null && (
        <TextField
          fullWidth
          label="Date"
          type="date"
          value={task.date ? task.date.toISOString().split("T")[0] : ""}
          onChange={(e) => onChange({ ...task, date: new Date(e.target.value) })}
        />
      )}
      </DialogContent>
      <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={onSave}>
            {task.id ? "Save Changes" : "Add Task"}
          </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;