import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    username: z.string().min(3, "name min = 3").max(10, "name max = 10"),
    email: z.string().email("email is invalid"),
    password: z.string().min(6, "password at least 6 characters "),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password confirm is not match",
    path: ["confirmPassword"],
  });

const testSchema = z.string().min(3, "This field ae least 3 characters");

type RegisterFormType = z.infer<typeof schema>;

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // isDirty : form đã thay đổi hay chưa , có thể ứng dụng cho việc ẩn button register khi người dùng chưa nhập gì cả
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    resolver: zodResolver(schema), // kết nối react hook form với zod
  });

  const onSubmit = (data: RegisterFormType) => {
      navigate("/");
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          {/* .................................................................. */}
          <div>
            <Input
              scale="medium"
              variant="primary"
              placeholder="Medium Primary Input"
              validateSchema={testSchema}
            />
          </div>
          {/* .................................................................. */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username")}
              />
              <span className="text-red-700">{errors.username?.message}</span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
              <span className="text-red-700">{errors.email?.message}</span>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
              <span className="text-red-700">{errors.password?.message}</span>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
              />
              <span className="text-red-700">
                {errors.confirmPassword?.message}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
