import { useMutation, useQuery, useQueryClient } from "react-query";
import Split from "react-split";
import Container from "./components/Container";
import UserAPI from "./api/userApi";
import { useState } from "react";
import { toast } from "react-toastify";

export default function App() {
  return (
    <div className="p-4 bg-[#eee]">
      <Split
        direction="vertical"
        style={{ height: "calc(100vh*4)" }}
        sizes={[33, 33, 33, 33]}
        gutterSize={20}
      >
        <Split className="hidden md:flex" sizes={[30, 70]} gutterSize={40}>
          <Container className="bg-white rounded-md">
            <Form />
          </Container>
          <Container className="p-4 rounded-md bg-white">
            <Table />
          </Container>
        </Split>
        <Split
          className="md:hidden"
          direction="vertical"
          gutterSize={40}
          sizes={[60, 40]}
        >
          <Container className="bg-white rounded-md">
            <Form />
          </Container>
          <Container className="p-4 rounded-md bg-white">
            <Table />
          </Container>
        </Split>
        <Container className="bg-gray-500 p-4 rounded-md flex items-center justify-center">
          <h1 className="text-3xl text-white font-bold">Other Component</h1>
        </Container>
        {/* this div for add padding in slide */}
        <div className="hidden md:flex"></div>
      </Split>
    </div>
  );
}

const Table = () => {
  const [data, setData] = useState([]);
  const getUsers = useQuery("getUsers", UserAPI.getUsers, {
    onSuccess: (response) => {
      if (response.data) setData(response.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className={`overflow-y-scroll relative no-scroll`}>
      <table className="min-w-full">
        <thead className="bg-[#f9fafb]">
          <tr className="h-12 sticky top-0">
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#f9fafb]"
            >
              S No
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#f9fafb]"
            >
              First Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#f9fafb]"
            >
              Last Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#f9fafb]"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-2 text-left bg-[#f9fafb]"
            >
              Contact
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr className="border-b cursor-pointer hover:bg-blue-100">
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {data.firstName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {data.lastName}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {data.email}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {data.phone}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {getUsers.isLoading ? (
        <div className="flex items-center justify-center h-40">
          <h2 className="text-6xl font-bold text-gray-300">Loading</h2>
        </div>
      ) : (
        data.length === 0 && (
          <div className="flex items-center justify-center h-40">
            <h2 className="text-6xl font-bold text-gray-300">No Data</h2>
          </div>
        )
      )}
    </div>
  );
};

const Form = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const queryClient = useQueryClient();

  const addUserMutation = useMutation(
    "addUser",
    async (data) => await UserAPI.addUser(data),
    {
      onSuccess: (response) => {
        toast.success("User create successfully!");
        setData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        });
        queryClient.invalidateQueries(["getUsers"]);
      },
      onError: (error) => {
        toast.error("Something went wrong!");
        // console.log(error);
      },
    }
  );

  const onClick = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone } = data || {};

    if (!firstName || !lastName || !email || !phone) {
      toast.error("All fields are required!");
      return;
    }

    addUserMutation.mutate(data);
  };

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  return (
    // this template copied from tailwind
    <div className="block p-6 rounded-lg shadow-md h-full">
      <form onSubmit={onClick}>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail1"
            className="form-label inline-block mb-2 text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={onChange}
            className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail1"
            ariaDescribedby="emailHelp"
            placeholder="First Name"
          />
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail1"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={onChange}
            className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail1"
            ariaDescribedby="emailHelp"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail1"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputEmail1"
            ariaDescribedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="block mt-1 text-xs text-gray-600">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputPassword1"
            className="form-label inline-block mb-2 text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={onChange}
            className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInputPassword1"
            placeholder="phone"
          />
        </div>
        <button
          type="submit"
          className="
          w-full
      px-6
      py-3
      bg-blue-600
      text-white
      font-bold
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          onClick={onClick}
        >
          {addUserMutation.isLoading ? "Loading.." : "Add"}
        </button>
      </form>
    </div>
  );
};
