
import { Box, List, ListItem, ListItemText, Divider, Fab } from "@mui/material";
import { CheckCircle, AllOut } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
import '../style/TaskSideBar.css';
import { useNavigate } from "react-router-dom";

const TaskSidebar = ({
    user,
    onFilterTasks,
    onAddTask,
  }: {
    user: any;
    onFilterTasks: (status: string) => void;
    onAddTask: () => void;
  }) => {

    const navigate = useNavigate();   
    
    const handleLogout = () => {
        localStorage.removeItem("user");
        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

  return (
    <Box className="sidebar">
      <Box>
        <h2 className="sidebar-header">Hello {user?.name || 'Guest'}</h2>
        
        <List>
          <ListItem 
            component="button" 
            onClick={() => onFilterTasks("All")} 
            className="sidebar-button">
            <AllOut sx={{ marginRight: 2, color: "white" }} />
            <ListItemText primary="All Tasks" sx={{ color: "white"}} />
          </ListItem>

          <ListItem 
            component="button" 
            onClick={() => onFilterTasks("Completed")} 
            className="sidebar-button">
            <CheckCircle sx={{ marginRight:2,  color: "white" }} />
            <ListItemText primary="Completed Tasks" sx={{ color: "white" }} />
          </ListItem>

          <Divider className="sidebar-divider" sx={{ marginBottom: 3 }} />

          <Fab color="primary" aria-label="add" onClick={onAddTask} className="fab-button">
            <AddIcon />
          </Fab>
        </List>
      </Box>
      <Fab onClick={handleLogout} className="logout-button" aria-label="logout"
        ><LogoutIcon /></Fab>
    </Box>
  );
};

export default TaskSidebar;
