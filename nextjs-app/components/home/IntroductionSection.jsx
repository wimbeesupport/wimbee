import Link from "next/link";
import Tag from "../Tag";
import Image from "next/image";

function IntroductionSection({ content }) {
  return (
    <section className="mx-auto max-w-[1568px] px-4 py-8 lg:pb-20 lg:pt-12">
      <div className="mb-5 flex flex-col items-start justify-between lg:mb-11 lg:flex-row">
        <Tag>{content.tag}</Tag>
        <p className="mt-8 text-2xl text-primary-800 lg:mt-0 lg:w-2/3 lg:text-3xl 2xl:text-[40px] 2xl:leading-[117.647%]">
          {content.description}
        </p>
      </div>

      <div className="flex flex-col items-start justify-between gap-5 lg:flex-row 2xl:gap-0">
        <Image
          src={content.imageUrl}
          width={600}
          height={600}
          alt="Introduction section of wimbee GIF"
          className="mb-6 h-80 w-full lg:mb-0 lg:w-80"
        />
        <div className="flex w-full flex-col gap-6 text-primary-800 lg:w-2/3">
          {content.links.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="group flex items-center justify-between text-3xl transition-all duration-500 lg:text-[40px] 2xl:text-5xl"
            >
              <span>{link.title}</span>
              <span className="size-4 rounded-full bg-primary-800 opacity-0 transition-all group-hover:opacity-100 lg:size-6 2xl:size-7" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IntroductionSection;
