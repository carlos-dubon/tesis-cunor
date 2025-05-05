interface Props {
  title: string;
  subtitle?: string;
}

export const Heading = (props: Props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">{props.title}</h1>
      {props.subtitle && <p>{props.subtitle}</p>}
    </div>
  );
};
