import { Dialog, Notify } from "quasar";
import AlertComponent from "src/components/Dialog/AlertComponent.vue";
export const alertDialog = ({
  title,
  message = null,
  scoresHistory = null,
  fulltime = "00:00:000",
  onYes = () => {},
  persistent = false,
  label = "Ok",
  isForm = false,
  iconPath,
  iconName,
  iconClass,
}) => {
  Dialog.create({
    component: AlertComponent,
    componentProps: {
      title,
      message,
      scoresHistory,
      fulltime,
      label,
      iconPath,
      iconName,
      iconClass,
    },
    parent: this,
    html: true,
    isForm,
    persistent,
  }).onOk(onYes);
};

export const showNotification = ({ message, color = "blue", icon }) => {
  Notify.create({
    message,
    color,
    icon,
    position: "top",
    progress: true,
    timeout: 3000,
  });
};
