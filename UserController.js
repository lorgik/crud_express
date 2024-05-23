import data from "./sql3-data.js";

class UserController {
  async listUsers(req, res) {
    try {
      const users = await data.getUsers();
      res.json(users);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async createUser(req, res) {
    try {
      const { name, age } = req.body;

      if (name && age) {
        const user = await data.addUser({ name, age });
        res.json(user);
      } else {
        res.status(400).json({ message: "Name and age are required" });
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await data.getUserById(id);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, age } = req.body;
      const user = await data.updateUser(id, { name, age });

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await data.deleteUser(id);

      if (isDeleted) {
        res.json();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
