import HTTP from "@/common/http";

const resource = "categories";

export default {
  async findAll() {
    const response = await HTTP.get(resource);
    return response.data;
  },
  async findOne(id) {
    const response = await HTTP.get(`${resource}/${id}`);
    return response.data;
  },
  async delete(id) {
    return await HTTP.delete(`${resource}/${id}`);
  },
  async save(categorie) {
    if (categorie.id) {
      return (await HTTP.put(`categories/${categorie.id}`, categorie)).data;
    } else {
      return (await HTTP.post(`categories`, categorie)).data;
    }
  },
};
