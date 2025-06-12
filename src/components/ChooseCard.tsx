import { Card, CardContent } from "./ui/card";

const ChooseCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: JSX.Element;
}) => {
  return (
    <Card className="w-[290px] h-[250px] bg-[#F7FEFC]">
      <CardContent className="w-full h-full flex flex-col justify-center items-center">
        {icon}

        <h3 className="text-xl font-medium tracking-tight py-3">{title}</h3>
        <p className="text-center text-black/80 tracking-tighter">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ChooseCard;
