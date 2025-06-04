"use client";
import { experienceLevels, employmentTypes } from "@/src/constants";
import React, { useState } from "react";
import { z } from "zod";

const JobFilterSchema = z.object({
  title: z.string().min(1, "Please select an title"),
  category: z.string().min(1, "Please select a category"),
  location: z.string().min(1, "Please select a location"),
});
type FormData = {
  title: string;
  category: string;
  location: string;
  experienceLevels: string[];
  employmentTypes: string[];
};

const JobFilter = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    category: "",
    location: "",
    experienceLevels: [],
    employmentTypes: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  //   handle input chnage
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };
  const handleExperienceCheckboxChange = (level: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.experienceLevels.includes(level);
      const updatedLevels = alreadySelected
        ? prev.experienceLevels.filter((l) => l !== level)
        : [...prev.experienceLevels, level];

      return { ...prev, experienceLevels: updatedLevels };
    });
  };
  const handleTypeCheckboxChange = (type: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.experienceLevels.includes(type);
      const updatedLevels = alreadySelected
        ? prev.experienceLevels.filter((t) => t !== type)
        : [...prev.experienceLevels, type];

      return { ...prev, experienceLevels: updatedLevels };
    });
  };

  //handle submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, category, location, experienceLevels } = formData;

    const schema = JobFilterSchema;
    const result = schema.safeParse({ title, category, location });

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // filter logic goes here
    console.log("Selected filters:", {
      title,
      category,
      location,
      experienceLevels,
      employmentTypes,
    });

    // Reset
    setFormData({
      title: "",
      category: "",
      location: "",
      experienceLevels: [],
      employmentTypes: [],
    });
    setErrors({});
  };

  const labelStyles = "block text-sm md:text-xl font-medium text-textColor";
  const inputStyles =
    "text-secondary mt-2 py-3 px-2 w-52  bg-white border border-gray100  focus:outline-none focus:ring-0";

  return (
    <aside className="p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="text-white">
          <label htmlFor="name" className={`${labelStyles}`}>
            Job Title
          </label>
          <select
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`${inputStyles}`}>
            {" "}
            <option value="">Select your field</option>
            <option value="user">1</option>
            <option value="recruiter">2</option>o
            <option value="admin">3</option>
          </select>
          {errors.title && (
            <p className="text-red-500 text-sm mt-3">{errors.title}</p>
          )}
        </div>
        <div className="text-white">
          <label htmlFor="name" className={`${labelStyles}`}>
            Category/Industrt
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`${inputStyles}`}>
            {" "}
            <option value="">Select your field</option>
            <option value="user">1</option>
            <option value="recruiter">2</option>o
            <option value="admin">3</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-3">{errors.category}</p>
          )}
        </div>
        <div className="text-white">
          <label htmlFor="name" className={`${labelStyles}`}>
            Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`${inputStyles}`}>
            {" "}
            <option value="">Select your field</option>
            <option value="user">1</option>
            <option value="recruiter">2</option>o
            <option value="admin">3</option>
          </select>
          {errors.location && (
            <p className="text-red-500 text-sm mt-3">{errors.location}</p>
          )}
        </div>
        {/*experience*/}
        <div className="flex flex-col gap-5">
          <p className={`${labelStyles}`}>Experience Level</p>
          <div className="flex flex-col gap-5 ">
            {experienceLevels.map((levels) => (
              <div
                key={levels.id}
                className="flex items-center space-x-2 text-textColor">
                <input
                  type="checkbox"
                  id={levels.level}
                  name="experience"
                  checked={formData.experienceLevels.includes(levels.level)}
                  onChange={() => handleExperienceCheckboxChange(levels.level)}
                  className="w-4 h-4 text-secondary focus:ring-white rounded"
                />
                <label htmlFor={levels.level} className="text-sm font-medium">
                  {levels.level}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* type of employment */}
        <div className="flex flex-col gap-5">
          <p className={`${labelStyles}`}>Type of Employment</p>
          <div className="flex flex-col gap-5 ">
            {employmentTypes.map((types) => (
              <div
                key={types.id}
                className="flex items-center space-x-2 text-textColor">
                <input
                  type="checkbox"
                  id={types.type}
                  name="experience"
                  checked={formData.employmentTypes.includes(types.type)}
                  onChange={() => handleTypeCheckboxChange(types.type)}
                  className="w-4 h-4 text-secondary focus:ring-white rounded"
                />
                <label htmlFor={types.type} className="text-sm font-medium">
                  {types.type}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </aside>
  );
};

export default JobFilter;
