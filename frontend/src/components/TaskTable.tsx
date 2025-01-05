import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Task } from "../types/ITask";
import { ArrowDropDown } from "@mui/icons-material";

interface TaskTableProps {
  tasks: Task[];
  statusCompleted?: boolean; 
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onPriorityChange: (priority: string) => void;
  onSortByStatus: () => void;  
  
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, statusCompleted, onEdit, onDelete, onPriorityChange, onSortByStatus }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [priorityMenuAnchorEl, setPriorityMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [menuTaskId, setMenuTaskId] = useState<number | null>(null);
  const filteredTasks = statusCompleted ? tasks.filter((task) => task.status === "Completed") : tasks;
  


  return (
    
    <TableContainer component={Paper} className="table-container">
  <Table>
    <TableHead className="table-header">
      <TableRow>
        <TableCell className="table-header-cell">Description</TableCell>
        <TableCell className="table-header-cell">
          Status
          <IconButton onClick={onSortByStatus} size="small">
            <ArrowDropDown />
          </IconButton>
        </TableCell>
        <TableCell className="table-header-cell">
          Priority
          <IconButton
            onClick={(e) => setPriorityMenuAnchorEl(e.currentTarget)}
            size="small"
          >
            <ArrowDropDown />
          </IconButton>
          <Menu
            anchorEl={priorityMenuAnchorEl}
            open={Boolean(priorityMenuAnchorEl)}
            onClose={() => setPriorityMenuAnchorEl(null)}
          >
            <MenuItem onClick={() => onPriorityChange("All")}>All</MenuItem>
            <MenuItem onClick={() => onPriorityChange("High")}>High</MenuItem>
            <MenuItem onClick={() => onPriorityChange("Medium")}>Medium</MenuItem>
            <MenuItem onClick={() => onPriorityChange("Low")}>Low</MenuItem>
          </Menu>
        </TableCell>
        <TableCell className="table-header-cell">Assignee</TableCell>
        <TableCell className="table-header-cell">Date</TableCell>
        <TableCell className="table-header-cell">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredTasks.map((task) => (
        <TableRow key={task.id} className="table-row">
          <TableCell>{task.description}</TableCell>
          <TableCell>{task.status === "Completed" ? "✔️ Completed" : task.status}</TableCell>
          <TableCell>{task.priority}</TableCell>
          <TableCell>{typeof task.assignee === 'object' ? task.assignee?.name : task.assignee}</TableCell>
          <TableCell>{new Date(task.date).toLocaleDateString()}</TableCell>
          <TableCell>
            <Button
              onClick={(e) => {
                setMenuAnchorEl(e.currentTarget);
                setMenuTaskId(task.id);
              }}
            >
              ⋮
            </Button>
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl) && menuTaskId === task.id}
              onClose={() => setMenuAnchorEl(null)}
            >
              <MenuItem className="menu-item" onClick={() => onEdit(task)}>Edit</MenuItem>
              <MenuItem className="menu-item" onClick={() => onDelete(task.id)}>Delete</MenuItem>
            </Menu>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
};

export default TaskTable;