import { request } from "./instance";

export default class UserAPI {
  static getUsers() {
    return request({ url: "users" });
  }

  static addUser(data) {
    return request({ url: "users", method: "post", data });
  }

  static updateUser(data) {
    const id = data.id;
    const updatedData = data.updatedData;

    return request({ url: `users/${id}`, method: "patch", data: updatedData });
  }

  static removeUser(data) {
    const id = data.id;

    return request({ url: `users/${id}`, method: "delete" });
  }
}
