import React from "react";

interface iMenuRightProps extends React.HTMLProps<HTMLDivElement> {}

const MenuRight: React.FC<iMenuRightProps> = (props) => {
  const { className } = props;
  return (
    <div className={"" + " " + className}>
      <div className="visible flex flex-col items-center ">
        Mục lục
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fuga
          harum eum quibusdam aspernatur nostrum adipisci totam ut perferendis
          eos veritatis nihil dignissimos, nulla magni inventore libero id quam
          asperiores?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fuga
          harum eum quibusdam aspernatur nostrum adipisci totam ut perferendis
          eos veritatis nihil dignissimos, nulla magni inventore libero id quam
          asperiores?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam fuga
          harum eum quibusdam aspernatur nostrum adipisci totam ut perferendis
          eos veritatis nihil dignissimos, nulla magni inventore libero id quam
          asperiores?
        </p>
      </div>
    </div>
  );
};

export default MenuRight;
