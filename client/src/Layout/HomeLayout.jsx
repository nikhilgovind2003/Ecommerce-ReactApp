import Sidebar from "../Components/Sidebar";



const HomeLayout = (props) => {
  return (
    <div className="px-4 py-24 md:w-[85%] md:ml-[15%] mx-auto md:pr-64">
      {props.children}
    </div>
  );
};

export default HomeLayout;
