"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

function ContactUsForm({ data }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form
      className="mx-auto flex max-w-2xl flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {data?.inputs.map((item, index) => (
        <div key={index} className="flex flex-col gap-6 bg-light-200 p-2">
          <label className="mb-6 font-mono text-xs uppercase text-primary-700 lg:text-base">
            {item.label}
          </label>
          {item.type !== "textarea" ? (
            <input
              type={item.type}
              placeholder={
                errors[item.label]
                  ? errors[item.label].message
                  : item.placeHolder
              }
              className={`flex-1 bg-light-200 text-lg font-medium focus:outline-none lg:text-xl ${
                errors[item.label]
                  ? "placeholder:text-[#FF0000]"
                  : "text-[#222] placeholder:text-gray-400"
              }`}
              {...register(item.label, {
                required: `${item.label} ${t("required")}*`,
              })}
              aria-invalid={errors[item.label] ? "true" : "false"}
            />
          ) : (
            <textarea
              name={item.label}
              className={`min-h-[200px] flex-1 resize-none bg-light-200 text-lg font-medium placeholder:absolute placeholder:bottom-0 focus:outline-none lg:text-xl lg:placeholder:text-2xl ${
                errors[item.label]
                  ? "placeholder:text-[#FF0000]"
                  : "text-[#222] placeholder:text-gray-400"
              }`}
              placeholder={
                errors[item.label]
                  ? errors[item.label].message
                  : item.placeHolder
              }
              {...register(item.label, {
                required: `${item.label} ${t("required")}*`,
              })}
              aria-invalid={errors[item.label] ? "true" : "false"}
            />
          )}
        </div>
      ))}
      <Button className="ml-auto h-auto w-fit rounded-custom bg-primary-800 px-2 py-1 text-lg text-primary-400 hover:bg-primary-800/95">
        {data?.submitBtnText}
      </Button>
    </form>
  );
}

export default ContactUsForm;
