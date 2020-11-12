import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required or your custom error message"
})
extend("email", {
  ...required,
  message: "This field is email"
})