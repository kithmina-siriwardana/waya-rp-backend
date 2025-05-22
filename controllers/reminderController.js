import Reminder from "../models/Reminder.js";

export const createReminder = async (req, res) => {
  const { userId, title, description, date, time } = req.body;

  try {
    const newReminder = new Reminder({
      userId,
      title,
      description,
      date,
      time,
    });
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (error) {
    console.log("error ", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.params.userId }).sort({
      date: -1,
      time: -1,
    });

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().split(" ")[0].slice(0, 5);

    const future = [];
    const expired = [];

    reminders.forEach((reminder) => {
      // Extract just the date part from the ISO string
      const reminderDate = reminder.date.toISOString().split("T")[0];

      // Compare dates first
      if (reminderDate > currentDate) {
        future.push(reminder);
      } else if (reminderDate < currentDate) {
        expired.push(reminder);
      } else {
        // If dates are equal, compare times
        if (reminder.time > currentTime) {
          future.push(reminder);
        } else {
          expired.push(reminder);
        }
      }
    });

    res.status(200).json({
      future: future.reverse(), // Already sorted in descending order
      expired: expired.reverse(), // Already sorted in descending order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time } = req.body;

    const updatedReminder = await Reminder.findByIdAndUpdate(
      id,
      { title, description, date, time },
      { new: true }
    );

    if (!updatedReminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(200).json(updatedReminder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReminder = await Reminder.findByIdAndDelete(id);

    if (!deletedReminder) {
      return res.status(404).json({ error: "Reminder not found" });
    }

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// export const getAllReminders = async (req, res) => {
//   try {
//     const reminders = await Reminder.find({ userId: req.params.userId }).sort({
//       createdAt: -1,
//     });
//     res.status(200).json(reminders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
