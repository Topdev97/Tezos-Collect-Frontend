type IProps = {
  modalVisible: boolean;
  setModalVisible: any;
  drawAlign?: IDrawerAlign;
  children: React.ReactNode;
};

type IDrawerAlign = "D_LEFT" | "D_RIGHT" | "D_CENTER";

const AceModal = ({
  modalVisible,
  setModalVisible,
  drawAlign = "D_CENTER",
  children,
}: IProps) => {
  //   const { modalVisible, setModalVisible, children } = props;
  return (
    <div className={`${modalVisible ? "flex" : "hidden"} ace-modal`}>
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
  );
};
export default AceModal;
