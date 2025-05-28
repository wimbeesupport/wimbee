import { myPortableTextComponents } from "@/lib/utils";
import { PortableText } from "next-sanity";

function Article({ content }) {
  return (
    <section className="relative z-10 mx-auto max-w-5xl px-5 pb-28 pt-20 2xl:pt-28">
      <div className="text-primary">
        <h1 className="mb-8 max-w-5xl text-5xl text-primary-800 lg:mb-10 lg:text-7xl 2xl:mb-20">
          {content?.title}
        </h1>
        <div className="text-primary-500">
          <PortableText
            value={content.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </section>
  );
}

export default Article;
