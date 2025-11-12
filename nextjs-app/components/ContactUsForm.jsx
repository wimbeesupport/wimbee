"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

import { useEffect, useRef } from "react";

import useWeb3Forms from "@web3forms/react";

function ContactUsForm({ data }) {
  const { t } = useTranslation();

  const methods = useForm({
    mode: "onTouched",
    projectTypes: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  // Access Key is in the .env file
  const apiKey = process.env.NEXT_PUBLIC_EMAIL_ACCESS_KEY;

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "New_Quote_Request_WIMBEETECH.COM",
      subject: "New_Quote_Request_WIMBEETECH.COM",
    },
    onSuccess: (msg, data) => {
      // router.push("success");
      reset();
    },
    onError: (msg, data) => {},
  });

  const textareaRef = useRef(null);
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Adjust height initially
      adjustTextareaHeight(textarea);
    }
  }, []);

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set to the scroll height
  };

  const handleInput = (e) => {
    adjustTextareaHeight(e.target);
  };

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
              ref={textareaRef}
              onInput={handleInput}
              rows={1} // Set initial rows to 1
              style={{ minHeight: "1.5em" }} // Adjust minHeight to match the text size
              className={`bg-light-200 resize-none overflow-hidden text-lg font-medium  focus:outline-none lg:text-xl lg:placeholder:text-2xl ${
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
      <Button
        disabled={isSubmitting}
        className="ml-auto min-w-44 max-h-7 disabled:bg-primary-800/85 h-auto w-fit disabled:pointer-events-auto disabled:cursor-not-allowed rounded-custom bg-primary-800 px-2  text-lg text-primary-400 hover:bg-primary-800/95"
      >
        {isSubmitting ? <span className="spinner-mini" /> : data?.submitBtnText}
      </Button>
    </form>
  );
}

export default ContactUsForm;
