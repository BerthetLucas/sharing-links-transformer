type ImageContainerProps = {
  image: string;
};

export const ImageContainer = ({ image }: ImageContainerProps) => {
  return (
    <div className="h-48 w-48">
      <img alt="" src={image} />
    </div>
  );
};
