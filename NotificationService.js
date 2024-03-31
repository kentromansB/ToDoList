import { Notifications } from "expo";
import { useEffect } from "react";
import axios from "axios";

//Function that calls the API request from the backend
async function fetchTask() {
  try {
    const id = await AsyncStorage.getItem("user_id");
    const uid = JSON.parse(id);
    const res = await axios.get("http://10.0.0.42:3007/api/fetchTask", {
      params: {
        user_id: uid,
      },
    });
    setTasks(res.data);
    setFilteredDataSource(res.data);
    setRefreshing(false);
  } catch (error) {
    console.error(error);
  }
}

const scheduleNotification = async () => {
  useEffect(() => {
    fetchTask();
  }, []);

  try {
    // Fetch tasks from your backend API
    const id = await AsyncStorage.getItem("user_id");
    const uid = JSON.parse(id);
    const res = await axios.get("http://10.0.0.42:3007/api/fetchTask", {
      params: {
        user_id: uid,
      },
    });
    const tasks = res.data; // Assuming your API returns an array of tasks

    // Schedule notifications for each task
    tasks.forEach(async (task) => {
      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Deadline Reminder",
          body: `Task ${task.title} deadline is approaching!`,
        },
        trigger: { seconds: calculateSecondsUntilDeadline(task.deadline) },
      });
      // Store the notificationId along with the task for future reference
      console.log(
        `Scheduled notification for task ${task.id}. Notification ID: ${notificationId}`
      );
    });
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
  }
};

const calculateSecondsUntilDeadline = (deadline) => {
  const deadlineTime = new Date(deadline).getTime();
  const currentTime = Date.now();
  const diff = deadlineTime - currentTime;
  return Math.max(0, Math.floor(diff / 10000)); // Ensure positive value
};

// // const scheduleNotification = async () => {
// //   const notificationId = await Notifications.scheduleNotificationAsync({
// //     content: {
// //       title: "Task Deadline Reminder",
// //       body: `Task ${taskId} deadline is approaching!`,
// //     },
// //     trigger: { seconds: calculateSecondsUntilDeadline(deadline) },
// //   });

// //   // Store the notificationId along with the task for future reference
// //   return notificationId;
// // };
