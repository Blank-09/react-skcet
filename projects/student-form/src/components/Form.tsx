import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  dob: z.string(),
  gender: z
    .literal("male")
    .or(z.literal("female"))
    .or(z.literal("other"))
    .or(z.literal("")),
  department: z.string(),
  city: z.string(),
  about: z.string(),
  terms: z.boolean(),
});

type FormData = z.infer<typeof studentSchema>;

export default function Form() {
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    department: "",
    city: "",
    about: "",
    terms: false,
  });

  async function sendDataToServer(formData: FormData) {
    const response = await fetch(
      "https://send.pageclip.co/Y01vxzlEpEyCRdFGUVeK6kLjkyOVpNQu/student-form-react-skcet",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error("Error sending data to server");
    }

    return response.text();
  }

  const mutation = useMutation({
    mutationFn: sendDataToServer,
  });

  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await mutation.mutateAsync(studentSchema.parse(data));
    } catch (error) {
      console.log(error);
    }
  }

  function onChangeHandler(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const target = e.target;

    setData((prev) => ({
      ...prev,
      [target.name]:
        target.type === "checkbox" && target instanceof HTMLInputElement
          ? target.checked
          : target.value,
    }));
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Please fill the form with your personal information.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  value={data.firstName}
                  onChange={onChangeHandler}
                  id="firstName"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={data.lastName}
                  onChange={onChangeHandler}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={data.dob}
                  onChange={onChangeHandler}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <fieldset className="sm:col-span-4">
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Gender
              </legend>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-x-3">
                  <input
                    id="male"
                    name="gender"
                    type="radio"
                    value="male"
                    checked={data.gender === "male"}
                    onChange={onChangeHandler}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    required
                  />
                  <label
                    htmlFor="male"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="female"
                    name="gender"
                    type="radio"
                    value="female"
                    checked={data.gender === "female"}
                    onChange={onChangeHandler}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    required
                  />
                  <label
                    htmlFor="female"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="other"
                    name="gender"
                    value="other"
                    checked={data.gender === "other"}
                    onChange={onChangeHandler}
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    required
                  />
                  <label
                    htmlFor="other"
                    className="block text-sm leading-6 text-gray-900"
                  >
                    Other
                  </label>
                </div>
              </div>
            </fieldset>

            <div className="sm:col-span-3">
              <label
                htmlFor="department"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Department
              </label>
              <div className="mt-2">
                <select
                  id="department"
                  name="department"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                  value={data.department}
                  onChange={onChangeHandler}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="it">B.Tech IT</option>
                  <option value="cse">BE/CSE</option>
                  <option value="aids">BE/AIDS</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City (Native)
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={data.city}
                  onChange={onChangeHandler}
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={data.about}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="relative flex gap-x-3 col-span-full">
              <div className="flex h-6 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={data.terms}
                  onChange={onChangeHandler}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  required
                />
              </div>
              <div className="text-sm leading-6">
                <label htmlFor="terms" className="text-gray-700">
                  I've honestly filled this form.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="reset"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Reset
        </button>
        <button
          disabled={mutation.isPending}
          type="submit"
          className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            mutation.isPending && "animate-pulse"
          }`}
        >
          {(mutation.isIdle && "Submit") ||
            (mutation.isPending && "Submitting") ||
            (mutation.isSuccess && "Submitted") ||
            (mutation.isError && "Error")}
        </button>
      </div>
    </form>
  );
}
