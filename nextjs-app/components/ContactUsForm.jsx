"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

import { useEffect, useRef } from "react";

import useWeb3Forms from "@web3forms/react";
import { toast } from "sonner";

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
      toast.success("Message sent successfully!");
      reset();
    },
    onError: (msg, data) => { },
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
      className="mx-auto flex max-w-2xl flex-col gap-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      {data?.inputs.map((item, index) => {
        const isTextarea = item.type === "textarea";
        const isCompact =
          (item?.type === "text" && (index === 0 || index === 1)) || item?.type === "email";

        // zero gap wrapper, no extra spacing
        const wrapperClass = "flex flex-col gap-0 pb-3";

        // label outside, no margin
        const labelClass = "font-mono text-xs uppercase text-primary-700 lg:text-sm mb-0 pb-1";

        // dense inputs; textarea stays taller
        const inputClass = [
          "w-full font-medium focus:outline-none",
          isCompact ? "h-8 px-3 leading-tight" : "h-9 px-3",
          "text-[#222]",
          // remove any inherited large text
          "text-base"
        ].join(" ");

        return (
          <div key={index} className={wrapperClass}>
            <label className={labelClass}>{item.label}</label>

            {/* box only around the field; no outer margin */}
            <div className="rounded-md bg-light-200">
              {!isTextarea ? (
                <input
                  type={item.type}
                  placeholder={item.placeHolder}
                  className={inputClass}
                  {...register(item.label, { required: `${item.label} ${t("required")}*` })}
                  aria-invalid={errors[item.label] ? "true" : "false"}
                />
              ) : (
                <textarea
                  name={item.label}
                  ref={textareaRef}
                  onInput={handleInput}
                  rows={4}
                  style={{ minHeight: "12rem" }}
                  placeholder={item.placeHolder}
                  className={[
                    "w-full resize-none overflow-hidden",
                    "px-3 py-3",
                    "text-base",
                    "leading-6 font-medium",
                    "focus:outline-none focus:ring-2 focus:ring-primary-800/30",
                    "text-[#222]"
                  ].join(" ")}
                  {...register(item.label, {
                    required: `${item.label} ${t("required")}*`,
                  })}
                  aria-invalid={errors[item.label] ? "true" : "false"}
                />
              )}
            </div>

            {errors[item.label] && (
              <p className="mt-1 text-[11px] leading-none text-red-500">{errors[item.label]?.message}</p>
            )}
          </div>
        );
      })}


      <div className="flex items-start gap-2 pb-4">
        <input
          type="checkbox"
          id="agreeToPolicy"
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          {...register("agreeToPolicy", {
            required: t("required"),
          })}
        />
        <label htmlFor="agreeToPolicy" className="text-sm text-gray-600">
          {data?.privacyPolicyText || t("agreeToPolicy", { ns: "contact" })}
        </label>
      </div>
      {errors.agreeToPolicy && (
        <p className="mb-4 text-[11px] leading-none text-red-500">
          {errors.agreeToPolicy?.message}
        </p>
      )}

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
