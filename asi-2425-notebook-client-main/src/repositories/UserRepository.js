import HTTP from "@/common/http";

const resource = "users";

export default {
  async findAll() {
    const response = await HTTP.get(resource);
    return response.data;
  },
  async delete(id) {
    return await HTTP.delete("users/" + id);
  },
  async desactivate(id) {
    return await HTTP.delete("users/" + id + "/active");
  },
  async activate(id) {
    return await HTTP.put("users/" + id + "/active");
  },

};
