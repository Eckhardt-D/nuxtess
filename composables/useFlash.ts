export default () => {
  let timeout: NodeJS.Timeout | null = null;

  const flash = useState("flash", () => ({
    show: false,
    message: "",
    variant: "info" as "success" | "error" | "info",
  }));

  const show = (
    message: string,
    type: "error" | "success" | "info" = "info"
  ) => {
    if (timeout) clearTimeout(timeout);

    flash.value.message = message;
    flash.value.variant = type;
    flash.value.show = true;

    timeout = setTimeout(() => {
      flash.value.show = false;
      flash.value.variant = "info";
      flash.value.message = "";
    }, 3000);
  };

  return {
    flash: flash.value,
    show,
  };
};
