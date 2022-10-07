type IProps = {
  modalVisible: boolean;
  setModalVisible: any;
  drawAlign?: IDrawerAlign;
  zIndex?: number;
  children: React.ReactNode;
};

type IDrawerAlign = "D_LEFT" | "D_RIGHT" | "D_CENTER";

const AceModal = ({
  modalVisible,
  setModalVisible,
  drawAlign = "D_CENTER",
  zIndex = 10,
  children,
}: IProps) => {
  //   const { modalVisible, setModalVisible, children } = props;
  return modalVisible ? (
    <div
      className={`${modalVisible ? "flex" : "hidden"} ace-modal`}
      style={{
        zIndex,
      }}
    >
      <div
        className="ace-modal-overlay"
        onClick={() => setModalVisible(false)}
      />
      <div
        className={`ace-modal-main ${
          drawAlign === "D_CENTER" ? "mx-auto" : "ml-auto"
        }`}
      >
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default AceModal;
