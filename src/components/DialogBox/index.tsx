interface DialogBoxProps {
  showDialog: boolean;
  cancelNavigation: any;
  confirmNavigation: any;
  warning?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  showDialog,
  cancelNavigation,
  confirmNavigation,
  warning,
}) => {
  return (
    <div
      className={
        "fixed z-[999] bg-primary  " + (showDialog ? " visible" : " hidden")
      }
    >
      <h1>Warning</h1>
      <b>There are some changes?</b>
      <br />
      {warning && warning.length
        ? warning
        : "Are you sure you want to navigate!"}
      <button onClick={cancelNavigation}>No</button>
      <button onClick={confirmNavigation}>Yes</button>
    </div>
  );
};
export default DialogBox;
