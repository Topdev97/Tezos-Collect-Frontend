type IProps = {
  drawerVisible: boolean;
  setDrawerVisible: any;
  drawAlign?: IDrawerAlign;
  children: React.ReactNode;
};

type IDrawerAlign = "D_LEFT" | "D_RIGHT" | "D_CENTER";

const AceDrawer = ({
  drawerVisible,
  setDrawerVisible,
  drawAlign = "D_LEFT",
  children,
}: IProps) => {
  //   const { drawerVisible, setDrawerVisible, children } = props;
  return (
    <div className={`${drawerVisible ? "flex" : "hidden"} ace-drawer`}>
      <div
        className="ace-drawer-overlay"
        onClick={() => setDrawerVisible(false)}
      />
      <div
        className={`ace-drawer-main ${
          drawAlign === "D_LEFT" ? "mr-auto" : "ml-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
export default AceDrawer;
