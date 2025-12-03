import { DotsLoader } from "react-loadly";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-36">
      <DotsLoader
        size={20}
        color="#8e7ab5"
        speed={1.4}
        loaderCenter={true}
        count={3}
        borderwidth={4}
        secondaryColor="#8e7ab5"
      />
    </div>
  );
};

export default Loading;
