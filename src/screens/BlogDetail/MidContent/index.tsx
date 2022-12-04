import DOMPurify from "dompurify";
import React from "react";

interface iMidContentProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  content: string;
}

const MidContent: React.FC<iMidContentProps> = (props) => {
  const { className, content, title } = props;
  return (
    <div className={"" + " " + className}>
      <h1>{title}</h1>
      <div className="min-h-[calc(75vh-52px)]">
        <div
          className="min-h-[calc(75vh-52px)]"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content, {
              ADD_TAGS: ["iframe"],
              ADD_ATTR: [
                "allow",
                "allowfullscreen",
                "frameborder",
                "scrolling",
              ],
            }),
          }}
        />
        <div />
      </div>
      <div className=" max-w-[1016px] w-full mx-auto">
        Bài viết khác từ <b>{}</b>
      </div>
      <div className=" max-w-[1016px]   w-full mx-auto">
        Comments<b>{}</b>
      </div>
      <div className=" max-w-[1016px]   w-full mx-auto">
        Comments Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
        corrupti pariatur in facere, hic aliquam illum et cum aliquid doloribus
        harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga
        iustoComments Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Animi corrupti pariatur in facere, hic aliquam illum et cum aliquid
        doloribus harum ex nostrum expedita delectus eveniet fuga iusto ducimus
        perferendis. ducimus perferendis. ducimus perferendis. ducimus
        perferendis. Comments Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Animi corrupti pariatur in facere, hic aliquam illum et cum
        aliquid doloribus harum ex nostrum expedita delectus eveniet fuga iusto
      </div>
    </div>
  );
};

export default MidContent;
