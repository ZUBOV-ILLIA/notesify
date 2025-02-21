export function bodyToggler(flag: boolean) {
  if (flag) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}
